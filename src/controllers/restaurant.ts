import Koa from 'koa';
import Router from 'koa-router';
import { updateRestaurantByFilter, findRestaurant } from 'src/models/restaurant';

export const getRestaurant = async (
  ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
  next: Koa.Next
) => {
  const restaurant = await findRestaurant({ id: ctx.params.id });
  if (restaurant) {
    ctx.response.body = restaurant;
  } else {
    ctx.response.status = 404;
  }

  await next();
};

export const updateRestaurant = async (
  ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
  next: Koa.Next
) => {
  const restaurant = await updateRestaurantByFilter({ id: ctx.params.id }, { $set: ctx.request.body });
  if (restaurant) {
    ctx.response.body = restaurant;
  } else {
    ctx.response.status = 404;
  }

  await next();
};
