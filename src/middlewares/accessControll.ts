import Koa from 'koa';
import { CustomAuthorizedContext } from '../types/controllers';
import { shouldSuppressCheck, bounceOff } from './utills';

const accessControll = async (ctx: CustomAuthorizedContext, next: Koa.Next) => {
  if (shouldSuppressCheck(ctx)) {
    await next();
    return;
  }

  if (ctx.originalUrl.split('/')[2] !== ctx.authorizationIdentity.restaurantOrigin) {
    bounceOff(ctx);
  } else {
    await next();
  }
};

export default accessControll;
