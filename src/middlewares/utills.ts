import { CustomAuthorizedContext } from '../types/controllers';

export const bounceOff = (ctx: CustomAuthorizedContext) => {
  ctx.throw(401, {
    data: {
      error: 'UNAUTHORIZED',
      allowed: false,
    },
  });
};

export const shouldSuppressCheck = (ctx: CustomAuthorizedContext) =>
  ctx.request.url === '/login' || ctx.request.url === '/introspect';
