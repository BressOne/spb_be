import { CustomAuthorizedContext } from '../types/controllers';

export const bounceOff = (ctx: CustomAuthorizedContext) => {
  ctx.throw(401, {
    data: {
      error: 'UNAUTHORIZED',
      allowed: false,
    },
  });
};

export const shouldSuppressCheck = (ctx: CustomAuthorizedContext) => {
  const routes = ['/login', '/introspect', '/demo'];
  return routes.some((r) => r === ctx.request.url);
};
