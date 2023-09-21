type Timeframe = {
  start: string;
  end: string;
};

type WorkingHours = {
  monday?: Timeframe;
  tuesday?: Timeframe;
  wednesday?: Timeframe;
  thursday?: Timeframe;
  friday?: Timeframe;
  saturday?: Timeframe;
  sunday?: Timeframe;
};

type UpdateRestaurantBody = Partial<{
  name: string;
  workingHours: WorkingHours;
  timezoneOffsetMinutes: number;
}>;

export default UpdateRestaurantBody;
