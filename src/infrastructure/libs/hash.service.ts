import * as bycrypt from 'bcrypt';

export const hash = async (password: string): Promise<string> => {
  return await bycrypt.hash(password, 10);
};

export const compare = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bycrypt.compare(password, hash);
};
