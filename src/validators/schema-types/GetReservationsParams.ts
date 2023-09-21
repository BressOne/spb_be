type GetReservationsParams =
  | { tableId: string }
  | {
      restaurantId: string;
    };
export default GetReservationsParams;
