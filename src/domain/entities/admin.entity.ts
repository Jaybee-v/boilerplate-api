import validateEmail from '../rules/valid-email';

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
    validateEmail(email);
  }

  public getId(): string {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getName(): string {
    return this.name;
  }

  public getPassword(): string {
    return this.password;
  }

  public getRole(): AdminRole {
    return this.role;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
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
