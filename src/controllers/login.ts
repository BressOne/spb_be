import Koa from 'koa';
import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { getUser } from '../models/user';

const login = async (
  ctx: Koa.ParameterizedContext<Koa.DefaultState, Router.IRouterParamContext<any, {}>, any>,
  next: Koa.Next
) => {
  const { username, password } = ctx.request.body as any;
  const user = await getUser({ username });

  if (user) {
    const { username: mdbUserName, id, restaurantOrigin, password: dbPass } = user;
    const compareResult = await bcryptjs.compare(password, dbPass);

    if (compareResult) {
      const token = jwt.sign({ username: mdbUserName, id, restaurantOrigin }, process.env.TOKEN_KEY || 'dummy');
      ctx.cookies.set('auth', token);
      ctx.response.status = 200;
    } else {
      ctx.response.status = 403;
    }
  } else {
    ctx.response.status = 403;
  }
  await next();
};

export default login;
