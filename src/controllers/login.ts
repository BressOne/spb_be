import Koa from 'koa';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { getUser } from '../models/user';
import { validateLoginBody } from '../validators/login';
import { ParametrizedKoaCtx } from '../types/controllers';

export const introspect = async (ctx: ParametrizedKoaCtx, next: Koa.Next) => {
  const token = ctx.request.headers.authorization;
  jwt.verify(token, process.env.TOKEN_KEY, async (err) => {
    ctx.response.status = 200;
    ctx.response.body = { allowed: !err };
    await next();
  });
};

export const login = async (ctx: ParametrizedKoaCtx, next: Koa.Next) => {
  const data = validateLoginBody(ctx.request.body);
  if (data.ok === false) {
    ctx.response.status = 400;
    ctx.response.body = data;
    await next();
    return;
  }
  const { username, password } = data.value;

  const user = await getUser({ username });

  if (user) {
    const { username: mdbUserName, id, restaurantOrigin, password: dbPass } = user;
    const compareResult = await bcryptjs.compare(password, dbPass);

    if (compareResult) {
      const token = jwt.sign({ username: mdbUserName, id, restaurantOrigin }, process.env.TOKEN_KEY);
      ctx.response.body = { token };
      ctx.response.status = 200;
    } else {
      ctx.response.status = 403;
    }
  } else {
    ctx.response.status = 403;
  }
  await next();
};
