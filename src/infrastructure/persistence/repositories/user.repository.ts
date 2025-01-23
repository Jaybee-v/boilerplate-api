import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/interfaces/user.interface';
import { PrismaService } from 'src/infrastructure/config/prisma.service';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: UserEntity): Promise<UserEntity> {
    const createdUser = await this.prisma.user.create({
      data: {
        id: user.getId(),
        name: user.getName(),
        familyName: user.getFamilyName(),
        email: user.getEmail(),
        password: user.getPassword(),
        role: user.getRole(),
      },
    });
    return UserMapper.toDomain(createdUser);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();

    return users.map(UserMapper.toDomain);
  }

  async patchUser(id: string, key: string, value: string): Promise<string> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { [key]: value },
    });

    return '';
  }
}
