import { Admin, Prisma } from '@prisma/client';
import { AdminEntity, AdminRole } from 'src/domain/entities/admin.entity';

export class AdminMapper {
  static toDomain(raw: Admin): AdminEntity {
    return new AdminEntity(
      raw.id,
      raw.name,
      raw.email,
      raw.password,
      raw.role as AdminRole,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPersistence(domain: AdminEntity): Prisma.AdminCreateInput {
    const data = {
      id: domain.getId(),
      name: domain.getName(),
      email: domain.getEmail(),
      password: domain.getPassword(),
      role: domain.getRole(),
    };
    return data;
  }
}
