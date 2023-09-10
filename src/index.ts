import Koa from 'koa';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import router from './router';

const PORT = Number.parseInt(process.env.PORT, 10) || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

const app = new Koa();

app.use(json());
app.use(logger());
app.use(bodyParser());
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
