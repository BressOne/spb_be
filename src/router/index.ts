import Router from 'koa-router';

import { propogateDemo } from '../controllers/demo';
import { getRestaurant, updateRestaurant } from '../controllers/restaurant';
import { getTable, getTables, addTable } from '../controllers/table';
import { findGuest } from '../controllers/guest';

const router = new Router();

if (process.env.DEMO) {
  router.post('/demo', async (ctx, next) => {
    await propogateDemo();
    ctx.response.status = 200;
    await next();
  });
}

router.get('/restaurant/:id', getRestaurant);
router.patch('/restaurant/:id', updateRestaurant);

router.get('/restaurant/:restaurantId/table/:tableId', getTable);
router.post('/restaurant/:restaurantId/table', addTable);
router.get('/restaurant/:restaurantId/tables', getTables);

router.get('/restaurant/:restaurantId/table/:tableId/reservations', getTable);
router.put('/restaurant/:restaurantId/table/:tableId/reservation', getTable);
router.patch('/restaurant/:restaurantId/table/:tableId/reservation', getTable);
router.delete('/restaurant/:restaurantId/table/:tableId/reservation', getTable);

router.get('/guest', findGuest);

export default router;
