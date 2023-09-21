import bcryptjs from 'bcryptjs';
import { ParametrizedKoaCtx } from '../types/controllers';
import { login } from '../controllers/login';

const users = {
  a: { username: 'a', password: '$2a$10$BL7RIK8ZyBPb1gyeiais2.C7ERvjqWyJ2ULr8oXo6XbkoI920/5z2' },
  b: { username: 'b', password: '$2a$10$BL7RIK8ZyBPb1gyeiais2.C7ERvjqWyJ2ULr8oXo6XbkoI920/5z2' }, // correct pass is asddsaa!@gfd
};

const token = 'token';

jest.mock('../models/user', () => ({
  getUser: async ({ username }) =>
    new Promise((resolve) => {
      users[username] ? resolve(users[username]) : resolve(null);
    }),
}));
jest.mock('jsonwebtoken', () => ({
  sign: () => token,
}));
jest.mock('bcryptjs');

describe('testing login controller file', () => {
  test('login with no password should drop 400', () => {
    const mockCallback = jest.fn();
    mockCallback.mockResolvedValue(true);
    const ctx = {
      request: {
        body: {
          username: 'a',
        },
      },
      response: {
        status: 111,
        body: undefined,
      },
    };
    login(ctx as ParametrizedKoaCtx, mockCallback);
    expect(ctx.response.status).toBe(400);
    expect(ctx.response.body).toBeDefined();
    expect(mockCallback).toBeCalledTimes(1);
  });
  test('login with no username should drop 400', () => {
    const mockCallback = jest.fn();
    mockCallback.mockResolvedValue(true);
    const ctx = {
      request: {
        body: {
          password: 'a',
        },
      },
      response: {
        status: 111,
        body: undefined,
      },
    };
    login(ctx as ParametrizedKoaCtx, mockCallback);
    expect(ctx.response.status).toBe(400);
    expect(ctx.response.body).toBeDefined();
    expect(mockCallback).toBeCalledTimes(1);
  });
  test('login with no body should drop 400', () => {
    const mockCallback = jest.fn();
    mockCallback.mockResolvedValue(true);
    const ctx = {
      request: {
        body: undefined,
      },
      response: {
        status: 111,
        body: undefined,
      },
    };
    login(ctx as ParametrizedKoaCtx, mockCallback);
    expect(ctx.response.status).toBe(400);
    expect(ctx.response.body).toBeDefined();
    expect(mockCallback).toBeCalledTimes(1);
  });
  test('login with incorrect pass should return 403', async () => {
    const mockCallback = jest.fn();
    mockCallback.mockResolvedValue(true);
    const ctx = {
      request: {
        body: {
          username: 'a',
          password: 'bsdsa',
        },
      },
      response: {
        status: 111,
        body: undefined,
      },
    };
    await login(ctx as ParametrizedKoaCtx, mockCallback);
    expect(ctx.response.status).toBe(403);
    expect(ctx.response.body).toBeUndefined();
    expect(mockCallback).toBeCalledTimes(1);
  });
  test('login with incorrect username should return 403', async () => {
    const mockCallback = jest.fn();
    mockCallback.mockResolvedValue(true);
    const ctx = {
      request: {
        body: {
          username: 'afffffff',
          password: 'b',
        },
      },
      response: {
        status: 111,
        body: undefined,
      },
    };
    await login(ctx as ParametrizedKoaCtx, mockCallback);
    expect(ctx.response.status).toBe(403);
    expect(ctx.response.body).toBeUndefined();
    expect(mockCallback).toBeCalledTimes(1);
  });
  test('login with correct creds should return token and 200', async () => {
    const mockCallback = jest.fn();
    jest.spyOn(bcryptjs, 'compare').mockImplementation((a, b) => a === b);
    mockCallback.mockResolvedValue(true);

    const ctx = {
      request: {
        body: {
          username: 'a',
          password: '$2a$10$BL7RIK8ZyBPb1gyeiais2.C7ERvjqWyJ2ULr8oXo6XbkoI920/5z2',
        },
      },
      response: {
        status: 111,
        body: undefined,
      },
    };
    await login(ctx as ParametrizedKoaCtx, mockCallback);
    expect(ctx.response.status).toBe(200);
    expect(ctx.response.body.token).toBe(token);
    expect(mockCallback).toBeCalledTimes(1);
  });
  test('login with invalid pass should return 403', async () => {
    const mockCallback = jest.fn();
    jest.spyOn(bcryptjs, 'compare').mockImplementation(() => false);
    mockCallback.mockResolvedValue(true);

    const ctx = {
      request: {
        body: {
          username: 'a',
          password: '$2a$10$BL7RIK8ZyBPb1gyeiais2.C7ERvjqWyJ2ULr8oXo6XbkoI920/5z2',
        },
      },
      response: {
        status: 111,
        body: undefined,
      },
    };
    await login(ctx as ParametrizedKoaCtx, mockCallback);
    expect(ctx.response.status).toBe(403);
    expect(ctx.response.body).toBeUndefined();
    expect(mockCallback).toBeCalledTimes(1);
  });
});
