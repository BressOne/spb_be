import Koa from 'koa';
import { updateRestaurantByFilter, findRestaurant } from '../models/restaurant';
import { CustomAuthorizedContext } from '../types/controllers';

export const getRestaurant = async (ctx: CustomAuthorizedContext, next: Koa.Next) => {
  const restaurant = await findRestaurant({ id: ctx.params.id });
  if (restaurant) {
    ctx.response.body = restaurant;
    await next();
  } else {
    ctx.response.status = 404;
    await next();
  }
};

export const updateRestaurant = async (ctx: CustomAuthorizedContext, next: Koa.Next) => {
  const restaurant = await updateRestaurantByFilter({ id: ctx.params.id }, { $set: ctx.request.body });
  if (restaurant) {
    ctx.response.body = restaurant;
  } else {
    ctx.response.status = 404;
  }

  await next();
};
