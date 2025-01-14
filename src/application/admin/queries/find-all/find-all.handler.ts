import { Inject, Injectable } from '@nestjs/common';
import { AdminEntity } from 'src/domain/entities/admin.entity';
import { IAdminRepository } from 'src/domain/interfaces/admin.interface';

@Injectable()
export class FindAllAdminHandler {
  constructor(
    @Inject('IAdminRepository')
    private readonly adminInterface: IAdminRepository,
  ) {}

  async execute(): Promise<AdminEntity[]> {
    return this.adminInterface.findAll();
  }
}
