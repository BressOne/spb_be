import Koa from 'koa';
import Router from 'koa-router';
import { v4 } from 'uuid';
import { findRestaurant } from '../models/restaurant';
import { getRestaurantTables, addRestaurantTable, getRestaurantTable, removeRestaurantTable } from '../models/table';

export const getTable = async (
  ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
  next: Koa.Next
) => {
  const table = await getRestaurantTable({ id: ctx.params.tableId }, ctx.params.restaurantId);
  // its a tricky thing about populated mongodb refs
  // mongodb can serch throug a document fields, that actually belong to it
  // and if populated reference field does not match the query, it'll be 'null'
  // actually it can be null when there is no existing ref now - it does not work like a sql foreign keys here
  // therefre having reference key here below is a signal that there is no such entity, matching query for subfield
  // handling this manually here as not going to denorm data. Check if you intersted: https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design
  //@ts-ignore
  if (table && table.restaurant) {
    ctx.response.body = table;
  } else {
    ctx.response.status = 404;
  }

  await next();
};

export const getTables = async (
  ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
  next: Koa.Next
) => {
  const tables = await getRestaurantTables({}, ctx.params.restaurantId);
  //@ts-ignore
  ctx.response.body = tables.filter((t) => t.restaurant);

  await next();
};

export const addTable = async (
  ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
  next: Koa.Next
) => {
  const restaurant = await findRestaurant({ id: ctx.params.restaurantId });
  if (!restaurant) {
    ctx.response.status = 400;
    await next();
    return;
  }
  const table = await addRestaurantTable({ id: v4(), restaurantObjectId: restaurant._id });
  ctx.response.body = table;
  await next();
};

export const removeTable = async (
  ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
  next: Koa.Next
) => {
  const restaurant = await findRestaurant({ id: ctx.params.restaurantId });
  if (!restaurant) {
    ctx.response.status = 400;
    await next();
    return;
  }
  const table = await removeRestaurantTable({ id: ctx.params.tableId });
  if (!table) {
    ctx.response.status = 404;
    await next();
    return;
  }
  ctx.response.body = table;
  await next();
};
