import ICar from '../../models/car.model';

export const formatGetCarsItemResponse = (item: any): ICar => {
  return {
    id: item.CarID,
    model: item.Model,
    year: item.Year,
    dateCreated: item.DateCreated,
    dateUpdated: item.DateUpdated,
  };
};

export const formatCarDbSave = (item: any): any => {
  return {
    Model: item.model,
    Year: item.year,
  };
};
