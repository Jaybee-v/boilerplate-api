import { AdminRole } from 'src/domain/entities/admin.entity';

export class CreateAdminCommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: AdminRole,
  ) {}
}
