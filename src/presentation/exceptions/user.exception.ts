import { HttpStatus } from '@nestjs/common';
import { BaseExceptions } from './base-exceptions';

export class UserAlreadyExistsException extends BaseExceptions {
  constructor(email: string) {
    super(
      `Un utilisateur existe déjà avec l'email ${email}`,
      HttpStatus.CONFLICT,
    );
  }
}
