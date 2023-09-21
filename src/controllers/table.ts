import Koa from 'koa';
import { v4 } from 'uuid';
import {
  validateAddTabeleBody,
  validateAddTabeleParams,
  validateGetTableParams,
  validateGetTablesParams,
  validateRemoveTabeleParams,
} from '../validators/table';
import { removeRestaurantTableReservations } from '../models/reservation';
import { findRestaurant } from '../models/restaurant';
import { getRestaurantTables, addRestaurantTable, getRestaurantTable, removeRestaurantTable } from '../models/table';
import { CustomAuthorizedContext } from '../types/controllers';

export const getTable = async (ctx: CustomAuthorizedContext, next: Koa.Next) => {
  const params = validateGetTableParams(ctx.params);
  if (params.ok === false) {
    ctx.response.status = 400;
    ctx.response.body = params;
    await next();
    return;
  }
  const table = await getRestaurantTable({ id: params.value.tableId }, params.value.restaurantId);
  if (table) {
    ctx.response.body = table;
  } else {
    ctx.response.status = 404;
  }

  await next();
};

export const getTables = async (ctx: CustomAuthorizedContext, next: Koa.Next) => {
  const params = validateGetTablesParams(ctx.params);
  if (params.ok === false) {
    ctx.response.status = 400;
    ctx.response.body = params;
    await next();
    return;
  }
  const tables = await getRestaurantTables({}, params.value.restaurantId);

  ctx.response.body = tables;

  await next();
};

export const addTable = async (ctx: CustomAuthorizedContext, next: Koa.Next) => {
  const params = validateAddTabeleParams(ctx.params);
  if (params.ok === false) {
    ctx.response.status = 400;
    ctx.response.body = params;
    await next();
    return;
  }
  const data = validateAddTabeleBody(ctx.request.body);
  if (data.ok === false) {
    ctx.response.status = 400;
    ctx.response.body = data;
    await next();
    return;
  }
  const restaurant = await findRestaurant({ id: params.value.restaurantId });
  if (!restaurant) {
    ctx.response.status = 400;
    await next();
    return;
  }
  const { name } = data.value;
  const table = await addRestaurantTable({
    id: v4(),
    name,
    restaurantId: restaurant.id,
  });
  ctx.response.body = table;
  await next();
};

export const removeTable = async (ctx: CustomAuthorizedContext, next: Koa.Next) => {
  const params = validateRemoveTabeleParams(ctx.params);
  if (params.ok === false) {
    ctx.response.status = 400;
    ctx.response.body = params;
    await next();
    return;
  }
  const restaurant = await findRestaurant({ id: params.value.restaurantId });
  if (!restaurant) {
    ctx.response.status = 400;
    await next();
    return;
  }
  // TODO: create a transaction
  const table = await removeRestaurantTable(params.value.tableId);
  if (!table) {
    ctx.response.status = 404;
    await next();
    return;
  }
  await removeRestaurantTableReservations({ tableId: table.id });
  ctx.response.body = {};
  await next();
};
