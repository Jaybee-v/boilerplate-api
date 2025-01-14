export class LoginAdminQuery {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
