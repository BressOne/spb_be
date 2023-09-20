import { v4 } from 'uuid';
import { Table } from '../types/db';
import { addRestaurantReservation } from '../models/reservation';
import { addRestaurantTable } from '../models/table';
import { addRestaurant } from '../models/restaurant';

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

const randomSegments = (n: number) => {
  let resultString = '';
  for (let index = 0; index < n; index++) {
    resultString = `${resultString} ${random(Math.floor(Math.random() * 15))}`;
  }
  return resultString;
};

const getUserName = () => {
  const names = [
    'Emily Johnson',
    'Alexander Smith',
    'Olivia Williams',
    'Benjamin Davis',
    'Sophia Anderson',
    'William Taylor',
    'Ava Martinez',
    'James Brown',
    'Mia Garcia',
    'Ethan Clark',
  ];

  return names[Math.round(Math.random() * (names.length - 1))];
};

const propogateDemo = async () => {
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

  const tableNames = ['Cozy Corner Table for Two', 'Window-side Dining Nook', "Chef's Table Experience"];

  const tableCreationPromises: Promise<Table>[] = [];
  for (let index = 0; index < tableNames.length; index++) {
    tableCreationPromises.push(addRestaurantTable({ id: v4(), name: tableNames[index], restaurantId }));
  }
  const tables = await Promise.all(tableCreationPromises);

  const promises: Promise<unknown>[] = [];
  for (let index = 0; index < tables.length; index++) {
    const table = tables[index];
    for (let i = 0; i < 4; i++) {
      for (let day = 0; day < 2; day++) {
        const seed = Math.round(Math.random() * 12);
        const start = new Date();
        start.setHours(seed + 24 * day, 0, 0, 0);
        const end = new Date();
        end.setHours(seed + 1 + 24 * day, 0, 0, 0);

        promises.push(
          addRestaurantReservation({
            id: v4(),
            tableId: table.id,
            guestName: getUserName(),
            meta: {
              personsToServe: Math.floor(Math.random() * 10),
              startTime: start,
              endTime: end,
              notes: randomSegments(22),
            },
          })
        );
      }
    }
  }
  await Promise.all(promises);
};

export default propogateDemo;
