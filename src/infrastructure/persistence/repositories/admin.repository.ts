import { Injectable } from '@nestjs/common';
import { AdminEntity } from 'src/domain/entities/admin.entity';
import { IAdminRepository } from 'src/domain/interfaces/admin.interface';
import { PrismaService } from 'src/infrastructure/config/prisma.service';
import { AdminMapper } from '../mappers/admin.mapper';

@Injectable()
export class AdminRepository implements IAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(admin: AdminEntity): Promise<AdminEntity> {
    const createdAdmin = await this.prisma.admin.create({
      data: {
        id: admin.getId(),
        name: admin.getName(),
        email: admin.getEmail(),
        password: admin.getPassword(),
      },
    });
    return AdminMapper.toDomain(createdAdmin);
  }

  async findAll(): Promise<AdminEntity[]> {
    const admins = await this.prisma.admin.findMany();

    return admins.map((admin) => AdminMapper.toDomain(admin));
  }

  async findByEmail(email: string): Promise<AdminEntity | null> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) return null;

    return AdminMapper.toDomain(admin);
  }

  async findById(id: string): Promise<AdminEntity | null> {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) return null;

    return AdminMapper.toDomain(admin);
  }

  async patchAdmin(id: string, key: string, value: string): Promise<string> {
    const admin = await this.prisma.admin.update({
      where: { id },
      data: { [key]: value },
    });
    return admin.id;
  }
}
