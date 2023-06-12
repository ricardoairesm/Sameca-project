import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';

import { loadEnv, connectDb, disconnectDB } from '@/config';
import { usersRouter, authenticationRouter, coursesRouter, likesRouter, requirementsRouter, teachersRouter, icsRouter } from '@/routers';

loadEnv();

import { handleApplicationErrors } from '@/middlewares';

const app = express();
app
  .use(cors())
  .use(express.json())
  .use('/users', usersRouter)
  .use('/auth', authenticationRouter)
  .use('/courses', coursesRouter)
  .use('/likes',likesRouter)
  .use('/requirements',requirementsRouter)
  .use('/teachers', teachersRouter)
  .use('/ics',icsRouter)
  .get('/health', (_req, res) => res.send('OK!'))
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
