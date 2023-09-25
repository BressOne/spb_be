import Koa from 'koa';
import { v4 } from 'uuid';
import { getRestaurantTable, getRestaurantTables } from '../models/table';
import {
  addRestaurantReservation,
  getRestaurantReservations,
  removeRestaurantReservationByFilter,
} from '../models/reservation';
import { CustomAuthorizedContext } from '../types/controllers';
import {
  validateAddReservationBody,
  validateAddReservationParams,
  validateGetReservationsParams,
  validateRemoveReservationParams,
  validateReservationTime,
} from '../validators/reservation';
import { findRestaurant } from '../models/restaurant';

export const getReservations = async (ctx: CustomAuthorizedContext, next: Koa.Next) => {
  const params = validateGetReservationsParams(ctx.params);
  if (params.ok === false) {
    ctx.response.status = 400;
    ctx.response.body = params;
    await next();
    return;
  }
  if (params.value.tableId) {
    ctx.response.body = await getRestaurantReservations({ tableId: params.value.tableId });
  } else {
    const tables = await getRestaurantTables({}, params.value.restaurantId);
    ctx.response.body = await getRestaurantReservations({ tableId: { $in: tables.map((t) => t.id) } });
  }

  await next();
};

export const removeReservation = async (ctx: CustomAuthorizedContext, next: Koa.Next) => {
  const params = validateRemoveReservationParams(ctx.params);
  if (params.ok === false) {
    ctx.response.status = 400;
    ctx.response.body = params;
    await next();
    return;
  }
  const table = await getRestaurantTable({ id: params.value.tableId }, params.value.restaurantId);
  if (!table) {
    ctx.response.status = 400;
    await next();
    return;
  }

  await removeRestaurantReservationByFilter({
    id: params.value.reservationId,
    tableId: params.value.tableId,
  });
  ctx.response.status = 200;
  await next();
};

export const addReservation = async (ctx: CustomAuthorizedContext, next: Koa.Next) => {
  const data = validateAddReservationBody(ctx.request.body);
  if (data.ok === false) {
    ctx.response.status = 400;
    ctx.response.body = data;
    await next();
    return;
  }
  const params = validateAddReservationParams(ctx.params);
  if (params.ok === false) {
    ctx.response.status = 400;
    ctx.response.body = params;
    await next();
    return;
  }
  const {
    guestName,
    meta: { personsToServe, startTime, endTime, notes },
  } = data.value;

  const restaurant = await findRestaurant({ id: params.value.restaurantId });
  if (!restaurant) {
    ctx.response.status = 404;
    await next();
  }

  if (!validateReservationTime({ restaurant, reservation: { startTime, endTime } })) {
    ctx.response.status = 400;
    await next();
    return;
  }
  const table = await getRestaurantTable({ id: params.value.tableId }, params.value.restaurantId);

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
