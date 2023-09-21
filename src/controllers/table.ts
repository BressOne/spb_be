import Koa from 'koa';
import { v4 } from 'uuid';
import { removeRestaurantTableReservations } from '../models/reservation';
import { findRestaurant } from '../models/restaurant';
import { getRestaurantTables, addRestaurantTable, getRestaurantTable, removeRestaurantTable } from '../models/table';
import { CustomAuthorizedContext } from '../types/controllers';

export const getTable = async (ctx: CustomAuthorizedContext, next: Koa.Next) => {
  const table = await getRestaurantTable({ id: ctx.params.tableId }, ctx.params.restaurantId);
  if (table) {
    ctx.response.body = table;
  } else {
    ctx.response.status = 404;
  }

  await next();
};

export const getTables = async (ctx: CustomAuthorizedContext, next: Koa.Next) => {
  const tables = await getRestaurantTables({}, ctx.params.restaurantId);

  ctx.response.body = tables;

  await next();
};

export const addTable = async (ctx: CustomAuthorizedContext, next: Koa.Next) => {
  const restaurant = await findRestaurant({ id: ctx.params.restaurantId });
  if (!restaurant) {
    ctx.response.status = 400;
    await next();
    return;
  }
  const { name } = ctx.request.body as { name: string };
  const table = await addRestaurantTable({
    id: v4(),
    name,
    restaurantId: restaurant.id,
  });
  ctx.response.body = table;
  await next();
};

export const removeTable = async (ctx: CustomAuthorizedContext, next: Koa.Next) => {
  const restaurant = await findRestaurant({ id: ctx.params.restaurantId });
  if (!restaurant) {
    ctx.response.status = 400;
    await next();
    return;
  }
  // TODO: create a transaction
  const table = await removeRestaurantTable(ctx.params.tableId);
  if (!table) {
    ctx.response.status = 404;
    await next();
    return;
  }
  await removeRestaurantTableReservations({ tableId: table.id });
  ctx.response.body = {};
  await next();
};
