import Koa from 'koa';
import Router from 'koa-router';
import { User } from './db';

export type Identity = Omit<User, 'password'>;

export type CustomAuthorizedContext = Koa.ParameterizedContext<
  Koa.DefaultState,
  Router.IRouterParamContext<any, {}>,
  any
> & {
  authorizationIdentity: Identity;
};

export type ParametrizedKoaCtx = Koa.ParameterizedContext<Koa.DefaultState, Router.IRouterParamContext<any, {}>, any>;
