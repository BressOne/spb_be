import Koa from 'koa';
import Router from 'koa-router';
import { getGuest } from 'src/models/guest';

export const findGuest = async (
  ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
  next: Koa.Next
) => {
  const guest = await getGuest({
    $or: [{ name: { $regex: ctx.request.query.param } }, { phonenumber: { $regex: ctx.request.query.param } }],
  });
  ctx.response.body = guest;
  await next();
};
