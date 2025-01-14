import { HttpStatus } from '@nestjs/common';
import { BaseExceptions } from './base-exceptions';

export class NotValidEmailException extends BaseExceptions {
  constructor(email: string) {
    super(`L'email ${email} n'est pas valide`, HttpStatus.NOT_ACCEPTABLE);
    this.name = 'NotValidEmailException';
  }
}

export class InvalidPasswordException extends BaseExceptions {
  constructor(message: string) {
    super(message, HttpStatus.NOT_ACCEPTABLE);
    this.name = 'InvalidPasswordException';
  }
}

export class UnAuthorizedTokenException extends BaseExceptions {
  constructor() {
    super('Token non valide', HttpStatus.UNAUTHORIZED);
    this.name = 'UnAuthorizedTokenException';
  }
}
