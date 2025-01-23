import validateEmail from '../rules/valid-email';

export enum UserRole {
  BULDUING_MANAGER = 'BULDUING_MANAGER',
  COLLABORATOR = 'COLLABORATOR',
  CRAFTMAN = 'CRAFTMAN',
  WAITING_LIST = 'WAITING_LIST',
}

export class UserEntity {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly familyName: string,
    private readonly email: string,
    private readonly password: string,
    private readonly role: UserRole,
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

  public getFamilyName(): string {
    return this.familyName;
  }

  public getPassword(): string {
    return this.password;
  }

  public getRole(): UserRole {
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
    familyName: string;
    email: string;
    password: string;
  }) {
    return new UserEntity(
      undefined,
      params.name,
      params.familyName,
      params.email,
      params.password,
      UserRole.WAITING_LIST,
      new Date(),
      new Date(),
    );
  }
}
