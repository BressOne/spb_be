import Koa from 'koa';
import Router from 'koa-router';
import { v4 } from 'uuid';
import { getRestaurantTable, getRestaurantTables } from '../models/table';
import {
  addRestaurantReservation,
  getRestaurantReservations,
  removeRestaurantReservationByFilter,
} from '../models/reservation';

export const getReservations = async (
  ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
  next: Koa.Next
) => {
  if (ctx.params.tableId) {
    ctx.response.body = await getRestaurantReservations({ tableId: ctx.params.tableId });
  } else {
    const tables = await getRestaurantTables({}, ctx.params.restaurantId);
    ctx.response.body = await getRestaurantReservations({ tableId: { $in: tables.map((t) => t.id) } });
  }

  await next();
};

export const removeReservation = async (
  ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
  next: Koa.Next
) => {
  const table = await getRestaurantTable({ id: ctx.params.tableId }, ctx.params.restaurantId);
  if (!table) {
    ctx.response.status = 400;
    await next();
    return;
  }

  await removeRestaurantReservationByFilter({
    id: ctx.params.reservationId,
    tableId: ctx.params.tableId,
  });
  ctx.response.status = 200;
  await next();
};

export const addReservation = async (
  ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
  next: Koa.Next
) => {
  const {
    guestName,
    meta: { personsToServe, startTime, endTime, notes },
  } = ctx.request.body as any;

  const table = await getRestaurantTable({ id: ctx.params.tableId }, ctx.params.restaurantId);

  if (!table) {
    ctx.response.status = 400;
    await next();
    return;
  }

  const reservation = await addRestaurantReservation({
    id: v4(),
    tableId: table.id,
    guestName,
    meta: {
      personsToServe,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      notes,
    },
  });

  ctx.response.body = reservation;
  await next();
};
