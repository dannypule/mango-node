import * as express from 'express';
import db from '../../db-schema';
import { formatGetCarsItemResponse, formatCarDbSave } from '../../controllers/cars/cars.helpers';
import ICar from '../../models/car.model';

export const getCars = (req: express.Request, res: express.Response) => {
  db.Cars.findAll().then((cars: ICar[]) => {
    const formatted: any[] = cars.map(formatGetCarsItemResponse);
    res.send(formatted);
  });
};

export const addCar = (req: express.Request, res: express.Response) => {
  const formatted: any = formatCarDbSave(req.body);

  db.Cars.create(formatted)
    .then((car: any) => {
      res.send(car);
    })
    .catch((err: any) => {
      res.status(500);
      res.send(err);
    });
};
