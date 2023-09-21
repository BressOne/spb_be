/* eslint-disable import/first */
import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import cors from '@koa/cors';

import router from './router';
import introspect from './middlewares/auth';
import accessControll from './middlewares/accessControll';

const PORT = Number.parseInt(process.env.PORT, 10);
const { MONGODB_URL } = process.env;

const app = new Koa();

app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(cors());
app.use(introspect);
app.use(accessControll);
app.use(router.routes());
app.use(router.allowedMethods());

const start = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    app.listen(PORT, () => {
      console.log('Koa on air!');
    });
  } catch (error) {
    console.error(error);
  }
};

start();
