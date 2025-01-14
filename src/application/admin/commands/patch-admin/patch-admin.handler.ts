import { Inject, Injectable } from '@nestjs/common';
import { IAdminRepository } from 'src/domain/interfaces/admin.interface';
import { ValidPassword } from 'src/domain/rules/valid-password';
import { compare, hash } from 'src/infrastructure/libs/hash.service';
import { AdminPasswordNotMatchException } from 'src/presentation/exceptions/admin.exception';
import { UnauthorizedActionException } from 'src/presentation/exceptions/auth.exception';
import { InvalidPasswordException } from 'src/presentation/exceptions/data.exception';
import { PatchAdminCommand } from './patch-admin.command';

@Injectable()
export class PatchAdminHandler {
  private readonly validPassword: ValidPassword = new ValidPassword();
  constructor(
    @Inject('IAdminRepository')
    private readonly adminRepository: IAdminRepository,
  ) {}

  async execute(command: PatchAdminCommand): Promise<string> {
    const { id, key, value, prevPassword } = command;

    const user = await this.adminRepository.findById(id);

    if (!user) {
      throw new UnauthorizedActionException();
    }

    let newValue = value;
    if (key === 'password' && prevPassword) {
      const checkPassword = await compare(prevPassword, user.getPassword());

      if (!checkPassword) {
        throw new AdminPasswordNotMatchException();
      }

      if (this.validPassword.validate(value)) {
        throw new InvalidPasswordException(this.validPassword.validate(value));
      }

      const hashedPassword = await hash(value);
      newValue = hashedPassword;
    } else if (key === 'password' && !prevPassword) {
      throw new AdminPasswordNotMatchException();
    }

    return this.adminRepository.patchAdmin(id, key, newValue);
  }
}
