import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/interfaces/user.interface';
import { UserAlreadyExistsException } from 'src/presentation/exceptions/user.exception';
import { CreateUserCommand } from './create-user.handler';

@Injectable()
export class CreateUserHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<string> {
    const checkExistingUser = await this.userRepository.findByEmail(
      command.email,
    );

    if (checkExistingUser) {
      throw new UserAlreadyExistsException(command.email);
    }

    const user = UserEntity.create({
      name: command.name,
      familyName: command.familyName,
      email: command.email,
      password: command.password,
    });

    const createdUser = await this.userRepository.save(user);

    return createdUser.getId();
  }
}
