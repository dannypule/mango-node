import * as express from 'express';
import db from '../../db-schema';
import { formatCarResponse, formatCarDbSave } from '../../controllers/cars/cars.helpers';
import ICar from '../../models/car.model';

export const getCars = (req: express.Request, res: express.Response) => {
  db.Cars.findAll().then((cars: ICar[]) => {
    const formatted: any[] = cars.map(formatCarResponse);
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

export const updateCar = (req: express.Request, res: express.Response) => {
  const car = req.body;

  db.Cars.update(
    {
      Model: car.model,
      Year: car.year,
    },
    {
      where: {
        CarID: car.id,
      },
    }
  )
    .then(() => {
      return db.Cars.findOne({
        where: {
          CarID: req.body.id,
        },
      });
    })
    .then((car: any) => res.send(formatCarResponse(car)))
    .catch((err: any) => {
      res.status(500);
      res.send(err);
    });
};

export const deleteCar = (req: express.Request, res: express.Response) => {
  db.Cars.destroy({
    where: {
      CarID: req.body.id,
    },
  })
    .then(() => {
      res.send({
        message: 'Successfully deleted car.',
      });
    })
    .catch((err: any) => {
      res.status(500);
      res.send(err);
    });
};
