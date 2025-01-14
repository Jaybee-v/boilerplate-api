export class ValidPassword {
  private readonly minLength: number;
  private readonly maxLength: number;
  private readonly hasUppercase: boolean;
  private readonly hasLowercase: boolean;
  private readonly hasNumber: boolean;
  private readonly hasSpecialChar: boolean;

  constructor(
    minLength: number = 8,
    maxLength: number = 20,
    hasUppercase: boolean = true,
    hasLowercase: boolean = true,
    hasNumber: boolean = false,
    hasSpecialChar: boolean = true,
  ) {
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.hasUppercase = hasUppercase;
    this.hasLowercase = hasLowercase;
    this.hasNumber = hasNumber;
    this.hasSpecialChar = hasSpecialChar;
  }

  validate(password: string): string | null {
    const errorMessage: string[] = [];
    if (password.length < this.minLength || password.length > this.maxLength) {
      errorMessage.push(
        `Le mot de passe doit contenir entre ${this.minLength} et ${this.maxLength} caractères`,
      );
    }

    if (this.hasUppercase && !/[A-Z]/.test(password)) {
      errorMessage.push(
        'Le mot de passe doit contenir au moins une lettre majuscule',
      );
    }

    if (this.hasLowercase && !/[a-z]/.test(password)) {
      errorMessage.push(
        'Le mot de passe doit contenir au moins une lettre minuscule',
      );
    }

    if (this.hasNumber && !/[0-9]/.test(password)) {
      errorMessage.push('Le mot de passe doit contenir au moins un chiffre');
    }

    if (
      this.hasSpecialChar &&
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password)
    ) {
      errorMessage.push(
        'Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*()_+\-=)',
      );
    }

    if (errorMessage.length > 0) {
      return errorMessage.join('\n');
    }

    return null;
  }
}
