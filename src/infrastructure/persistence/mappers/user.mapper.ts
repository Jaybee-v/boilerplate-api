import { Prisma, User } from '@prisma/client';
import { UserEntity, UserRole } from 'src/domain/entities/user.entity';

export class UserMapper {
  static toDomain(raw: User): UserEntity {
    return new UserEntity(
      raw.id,
      raw.name,
      raw.familyName,
      raw.email,
      raw.password,
      raw.role as UserRole,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPersistence(domain: UserEntity): Prisma.UserCreateInput {
    const data = {
      id: domain.getId(),
      name: domain.getName(),
      familyName: domain.getFamilyName(),
      email: domain.getEmail(),
      password: domain.getPassword(),
      role: domain.getRole(),
    };
    return data;
  }
}
