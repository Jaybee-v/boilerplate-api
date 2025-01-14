import { HttpStatus } from '@nestjs/common';
import { BaseExceptions } from './base-exceptions';

export class BadCredentialsException extends BaseExceptions {
  constructor() {
    super('Identifiants invalides', HttpStatus.UNAUTHORIZED);
    this.name = 'BadCredentialsException';
  }
}

export class UnauthorizedActionException extends BaseExceptions {
  constructor() {
    super(
      "Vous n'êtes pas autorisé à réaliser cette action",
      HttpStatus.UNAUTHORIZED,
    );
    this.name = 'UnauthorizedActionException';
  }
}
