export interface IAuthPort {
  generateToken(payload: any): string;
  generateRefreshToken(payload: any): string;
  verifyToken(token: string): any;
}
