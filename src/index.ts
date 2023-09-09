import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

const PORT = Number.parseInt(process.env.PORT, 10);
const MONGODB_URL = process.env.MONGODB_URL;

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = 'hello world';
  await next();
});

app.use(json());
app.use(logger());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

const start = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    app.listen(PORT, () => {
      console.log('Koa on the air!');
    });
  } catch (error) {
    console.error(error);
  }
};

start();
