export class RefreshTokenEntity {
  constructor(
    private readonly id: string,
    private readonly userId: string,
    private readonly token: string,
    private readonly expiredAt: Date,
  ) {}

  public getId() {
    return this.id;
  }

  public getUserId() {
    return this.userId;
  }

  public getToken() {
    return this.token;
  }

  public getExpiredAt() {
    return this.expiredAt;
  }

  static create(params: { userId: string; token: string; expiredAt: Date }) {
    return new RefreshTokenEntity(
      undefined,
      params.userId,
      params.token,
      params.expiredAt,
    );
  }
}
