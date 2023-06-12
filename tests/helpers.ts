import * as jwt from 'jsonwebtoken';
import { Users } from '@prisma/client';

import { createUser } from './factories';
import { createSession } from './factories/sessions-factory';
import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.requirements.deleteMany({});
  await prisma.likes.deleteMany({});
  await prisma.iCs.deleteMany({});
  await prisma.teachers.deleteMany({});
  await prisma.courses.deleteMany({});
  await prisma.sessions.deleteMany({});
  await prisma.users.deleteMany({});
 
}

export async function generateValidToken(user?: Users) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token);

  return token;
}
