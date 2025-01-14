import { NotValidEmailException } from '../../presentation/exceptions/data.exception';

export enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
}

export class AdminEntity {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly password: string,
    private readonly role: AdminRole,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {
    this.validateEmail(email);
  }

  private validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new NotValidEmailException(email);
    }
  }

  public getId() {
    return this.id;
  }

  public getEmail() {
    return this.email;
  }

  public getName() {
    return this.name;
  }

  public getPassword() {
    return this.password;
  }

  public getRole() {
    return this.role;
  }

  public getCreatedAt() {
    return this.createdAt;
  }

  public getUpdatedAt() {
    return this.updatedAt;
  }

  static create(params: {
    name: string;
    email: string;
    password: string;
    role: AdminRole;
  }) {
    return new AdminEntity(
      undefined,
      params.name,
      params.email,
      params.password,
      params.role,
      new Date(),
      new Date(),
    );
  }
}
