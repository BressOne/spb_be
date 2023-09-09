import Restaurant from '../models/restaurant';
import Table from '../models/table';
import Guest from '../models/guest';
import Reservation from '../models/reservation';
import { v4 } from 'uuid';
import { ObjectId } from 'mongoose';

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
  await Restaurant.addRestaurant({
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
  const restaurant = await Restaurant.getRestaurant({ id: restaurantId });
  for (let index = 0; index < 5; index++) {
    await Table.addRestaurantTable({ id: v4(), restaurantObjectId: restaurant._id });
  }
  for (let index = 0; index < 5; index++) {
    await Guest.addGuest({
      id: v4(),
      name: random(10),
      phonenumber: `+${Math.floor(Math.random() * Math.pow(10, 10))}`,
    });
  }
  for (let index = 0; index < 5; index++) {
    const table = await Table.getRestaurantTable({}, restaurantId);
    const guest = await Guest.getGuest({});
    const start = new Date();
    start.setHours(2 + index, 0, 0, 0);
    const end = new Date();
    end.setHours(3 + index, 0, 0, 0);

    await Reservation.addReservation({
      id: v4(),
      table: table._id,
      guest: guest._id,
      meta: {
        personsToServe: Math.floor(Math.random() * 10),
        startTimeUTC: start,
        endTimeUTC: end,
        notes: `${random(Math.floor(Math.random() * 10))} ${random(Math.floor(Math.random() * 10))} ${random(
          Math.floor(Math.random() * 10)
        )} ${random(Math.floor(Math.random() * 10))} `,
      },
    });
  }
};
