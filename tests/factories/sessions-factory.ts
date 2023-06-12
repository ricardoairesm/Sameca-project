import { Sessions } from '@prisma/client';
import { createUser } from './users-factory';
import { prisma } from '@/config';

export async function createSession(token: string): Promise<Sessions> {
  const user = await createUser();

  return prisma.sessions.create({
    data: {
      token: token,
      userId: user.id,
    },
  });
}
