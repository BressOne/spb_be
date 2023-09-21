type GetReservationsParams =
  | { tableId: string; restaurantId: undefined }
  | {
      tableId: undefined;
      restaurantId: string;
    };
export default GetReservationsParams;
