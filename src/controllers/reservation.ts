import Koa from 'koa';
import Router from 'koa-router';
import { v4 } from 'uuid';
import { getRestaurantTable } from '../models/table';
import { addGuest, getGuest } from '../models/guest';
import { addRestaurantReservation, getRestaurantReservations } from '../models/reservation';

export const getReservations = async (
  ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
  next: Koa.Next
) => {
  const reservations = await getRestaurantReservations({}, ctx.params.restaurantId);
  //@ts-ignore
  ctx.response.body = reservations.filter((t) => t.restaurant);
  await next();
};

export const addReservation = async (
  ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
  next: Koa.Next
) => {
  const { personsToServe, startTime, endTime, notes, guestId, newGuestData } = ctx.body;

  const table = await getRestaurantTable({ id: ctx.params.tableId }, ctx.params.restaurantId);
  //@ts-ignore
  if (!table || !table.restaurant) {
    ctx.response.status = 400;
    await next();
    return;
  }

  let guest;
  if (guestId) {
    const existingGuest = await getGuest({ id: guestId });
    guest = existingGuest;
    if (!existingGuest) {
      ctx.response.status = 404;
      await next();
      return;
    }
  } else {
    guest = await addGuest(newGuestData);
  }

  const reservation = await addRestaurantReservation({
    id: v4(),
    table: table._id,
    guest: guest._id,
    meta: {
      personsToServe,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      notes: notes,
    },
  });
  //@ts-ignore
  ctx.response.body = reservation;
  await next();
};
