import { NotValidEmailException } from 'src/presentation/exceptions/data.exception';

export default function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new NotValidEmailException(email);
  }
}
