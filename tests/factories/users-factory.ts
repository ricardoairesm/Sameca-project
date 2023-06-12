import bcrypt from 'bcrypt';
import faker from '@faker-js/faker';
import { Users } from '@prisma/client';
import { prisma } from '@/config';

export async function createUser(params: Partial<Users> = {}): Promise<Users> {
  const incomingPassword = params.password || faker.internet.password(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);
  const name = params.name || faker.name.findName();

  return prisma.users.create({
    data: {
      email: params.email || faker.internet.email(),
      password: hashedPassword,
      name:name,
    },
  });
}
