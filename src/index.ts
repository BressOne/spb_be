import Koa from 'koa';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import cors from '@koa/cors';

import router from './router';

const PORT = Number.parseInt(process.env.PORT, 10) || 3001;
const MONGODB_URL =
  process.env.MONGODB_URL ||
  'mongodb+srv://Usernameuio1:qDU1d1A1B7jnjVzB@cluster1.bs3x6pu.mongodb.net/test?retryWrites=true&w=majority';

const app = new Koa();

app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(cors());
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
