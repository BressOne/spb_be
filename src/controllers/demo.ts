import { v4 } from 'uuid';
import { addRestaurantReservation } from '../models/reservation';
import { addGuest, getGuest } from '../models/guest';
import { addRestaurantTable, getRestaurantTable } from '../models/table';
import { addRestaurant, findRestaurant } from '../models/restaurant';

const random = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const propogateDemo = async () => {
  const restaurantId = v4();
  await addRestaurant({
    id: restaurantId,
    name: random(8),
    workingHours: {
      monday: {
        start: '01:00',
        end: '23:00',
      },
      tuesday: {
        start: '01:00',
        end: '23:00',
      },
      wednesday: {
        start: '01:00',
        end: '23:00',
      },
      thursday: {
        start: '01:00',
        end: '23:00',
      },
      friday: {
        start: '01:00',
        end: '23:00',
      },
      saturday: {
        start: '01:00',
        end: '23:00',
      },
      sunday: {
        start: '01:00',
        end: '23:00',
      },
    },
    timezoneOffsetMinutes: 120,
  });
  const restaurant = await findRestaurant({ id: restaurantId });
  for (let index = 0; index < 5; index++) {
    await addRestaurantTable({ id: v4(), restaurantObjectId: restaurant._id });
  }
  for (let index = 0; index < 5; index++) {
    await addGuest({
      id: v4(),
      name: random(10),
      phonenumber: `+${Math.floor(Math.random() * Math.pow(10, 10))}`,
    });
  }
  for (let index = 0; index < 5; index++) {
    const table = await getRestaurantTable({}, restaurantId);
    const guest = await getGuest({});
    const start = new Date();
    start.setHours(2 + index, 0, 0, 0);
    const end = new Date();
    end.setHours(3 + index, 0, 0, 0);

    await addRestaurantReservation({
      id: v4(),
      table: table._id,
      guest: guest._id,
      meta: {
        personsToServe: Math.floor(Math.random() * 10),
        startTime: start,
        endTime: end,
        notes: `${random(Math.floor(Math.random() * 10))} ${random(Math.floor(Math.random() * 10))} ${random(
          Math.floor(Math.random() * 10)
        )} ${random(Math.floor(Math.random() * 10))} `,
      },
    });
  }
};
