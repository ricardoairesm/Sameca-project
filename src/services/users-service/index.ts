import { Users } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client'
import { duplicatedEmailError } from './errors';
import userRepository from '@/repositories/user-repository';
import { cannotEnrollBeforeStartDateError } from '@/errors';

export async function createUser({ email, password, name }: Prisma.UsersCreateInput): Promise<Users> {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
    name,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}


export type CreateUserParams = Pick<Users, 'email' | 'password' | 'name'>;

const userService = {
  createUser,
};

export * from './errors';
export default userService;

