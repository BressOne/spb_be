import Koa from 'koa';
import {
  validateGetRestaurantParams,
  validateUpdateRestaurantBody,
  validateUpdateRestaurantParams,
} from '../validators/restaurant';
import { updateRestaurantByFilter, findRestaurant } from '../models/restaurant';
import { CustomAuthorizedContext } from '../types/controllers';

export const getRestaurant = async (ctx: CustomAuthorizedContext, next: Koa.Next) => {
  const params = validateGetRestaurantParams(ctx.params);
  if (params.ok === false) {
    ctx.response.status = 400;
    ctx.response.body = params;
    await next();
    return;
  }
  const restaurant = await findRestaurant({ id: params.value.id });
  if (restaurant) {
    ctx.response.body = restaurant;
    await next();
  } else {
    ctx.response.status = 404;
    await next();
  }
};

export const updateRestaurant = async (ctx: CustomAuthorizedContext, next: Koa.Next) => {
  const params = validateUpdateRestaurantParams(ctx.params);
  if (params.ok === false) {
    ctx.response.status = 400;
    ctx.response.body = params;
    await next();
    return;
  }
  const data = validateUpdateRestaurantBody(ctx.request.body);
  if (data.ok === false) {
    ctx.response.status = 400;
    ctx.response.body = data;
    await next();
    return;
  }
  const restaurant = await updateRestaurantByFilter({ id: params.value.id }, { $set: data.value });
  if (restaurant) {
    ctx.response.body = restaurant;
  } else {
    ctx.response.status = 404;
  }

  await next();
};
