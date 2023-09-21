import Koa from 'koa';
import jwt from 'jsonwebtoken';
import { CustomAuthorizedContext, Identity } from '../types/controllers';
import { shouldSuppressCheck, bounceOff } from './utills';

const introspect = async (ctx: CustomAuthorizedContext, next: Koa.Next) => {
  if (shouldSuppressCheck(ctx)) {
    await next();
    return;
  }

  const token = ctx.request.headers.authorization;

  if (!token) {
    bounceOff(ctx);
  }

  const jwtResponse: { error: Error; decoded: Identity } = await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_KEY || 'dummy', (error: Error, decoded: Identity) => {
      resolve({ error, decoded });
    });
  });
  if (jwtResponse.decoded && !jwtResponse.error) {
    ctx.authorizationIdentity = jwtResponse.decoded;
    await next();
  } else {
    bounceOff(ctx);
  }
};

export default introspect;
