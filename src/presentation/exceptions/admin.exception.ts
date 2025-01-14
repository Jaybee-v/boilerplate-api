import { HttpStatus } from '@nestjs/common';
import { BaseExceptions } from './base-exceptions';

export class AdminAlreadyExistsException extends BaseExceptions {
  constructor(email: string) {
    super(`Un admin existe déjà avec l'email ${email}`, HttpStatus.CONFLICT);
    this.name = 'AdminAlreadyExistsException';
  }
}

export class AdminNotFoundException extends BaseExceptions {
  constructor() {
    super(`L'administrateur n'existe pas`, HttpStatus.NOT_FOUND);
    this.name = 'AdminNotFoundException';
  }
}

export class AdminPasswordNotMatchException extends BaseExceptions {
  constructor() {
    super(`Le mot de passe actuel ne correspond pas`, HttpStatus.BAD_REQUEST);
    this.name = 'AdminPasswordNotMatchException';
  }
}
