import Koa from 'koa';
import Router from 'koa-router';
import { findRestaurant } from '../models/restaurant';

//it is mocked just to provide a context
export const login = async (
  ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
  next: Koa.Next
) => {
  const restaurant = await findRestaurant({});
  if (restaurant) {
    ctx.response.body = { restaurantOrigin: restaurant.id };
  } else {
    ctx.response.status = 500;
    ctx.response.body = 'propagate the DB to have restaurant origins';
  }
  await next();
};
