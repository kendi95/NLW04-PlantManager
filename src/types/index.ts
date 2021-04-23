export type IPlant = {
  id: number;
  name: string;
  about: string;
  photo: string;
  water_tips: string;
  environments: Array<string>;
  frequency: {
    times: number;
    repeat_every: string;
  }
  dateTimeNotification: Date;
  hour: string;
}

export type IStoragePlant = {
  [id: string]: {
    data: IPlant;
    notificationId: string;
  }
}