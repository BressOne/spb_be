import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import { propogateDemo } from './controllers/demo';
import { getRestaurant, updateRestaurant } from './controllers/restaurant';
import { getTable, getTables } from './controllers/table';

const PORT = Number.parseInt(process.env.PORT, 10) || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

const app = new Koa();
const router = new Router();

router.post('/demo', async (ctx, next) => {
  await propogateDemo();
  ctx.response.status = 200;
  await next();
});
router.get('/restaurant/:id', getRestaurant);
router.patch('/restaurant/:id', updateRestaurant);

router.get('/restaurant/:restaurantId/table/:tableId', getTable);
router.get('/restaurant/:restaurantId/tables', getTables);

app.use(json());
app.use(logger());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

const start = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
  } catch (error) {
    console.error(error);
  }
};
app.listen(PORT, () => {
  console.log('Koa on air!');
});

start();
