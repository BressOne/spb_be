import Router from 'koa-router';

import propogateDemo from '../controllers/demo';
import { getRestaurant, updateRestaurant } from '../controllers/restaurant';
import { getTable, getTables, addTable, removeTable } from '../controllers/table';

import { login, introspect } from '../controllers/login';
import { getReservations, addReservation, removeReservation } from '../controllers/reservation';

const router = new Router();

router.get('/demo', async (ctx, next) => {
  await propogateDemo();
  ctx.response.status = 200;
  await next();
});

router.post('/login', login);
router.post('/introspect', introspect);

router.get('/restaurant/:id', getRestaurant);
router.patch('/restaurant/:id', updateRestaurant);

router.get('/restaurant/:restaurantId/table/:tableId', getTable);
router.post('/restaurant/:restaurantId/table', addTable);
router.get('/restaurant/:restaurantId/tables', getTables);
router.delete('/restaurant/:restaurantId/table/:tableId', removeTable);

router.get('/restaurant/:restaurantId/table/:tableId/reservations', getReservations);
router.get('/restaurant/:restaurantId/reservations', getReservations);
router.post('/restaurant/:restaurantId/table/:tableId/reservation', addReservation);
router.delete('/restaurant/:restaurantId/table/:tableId/reservation/:reservationId', removeReservation);

export default router;
