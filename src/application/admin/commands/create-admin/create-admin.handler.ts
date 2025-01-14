import { Inject, Injectable } from '@nestjs/common';
import { AdminEntity } from 'src/domain/entities/admin.entity';
import { IAdminRepository } from 'src/domain/interfaces/admin.interface';
import { ValidPassword } from 'src/domain/rules/valid-password';
import { hash } from 'src/infrastructure/libs/hash.service';
import { AdminAlreadyExistsException } from 'src/presentation/exceptions/admin.exception';
import { InvalidPasswordException } from 'src/presentation/exceptions/data.exception';
import { CreateAdminCommand } from './create-admin.command';

@Injectable()
export class CreateAdminHandler {
  private readonly validPassword: ValidPassword = new ValidPassword();
  constructor(
    @Inject('IAdminRepository')
    private readonly adminRepository: IAdminRepository,
  ) {}

  async execute(command: CreateAdminCommand): Promise<string> {
    const checkExistingAdmin = await this.adminRepository.findByEmail(
      command.email,
    );

    if (checkExistingAdmin) {
      throw new AdminAlreadyExistsException(command.email);
    }

    console.log(this.validPassword.validate(command.password));
    if (this.validPassword.validate(command.password)) {
      throw new InvalidPasswordException(
        this.validPassword.validate(command.password),
      );
    }

    const admin = AdminEntity.create({
      name: command.name,
      email: command.email,
      password: await hash(command.password),
      role: command.role,
    });

    const createdAdmin = await this.adminRepository.create(admin);

    return `Vous venez de créer un compte admin pour ${createdAdmin.getEmail()} avec succès`;
  }
}
