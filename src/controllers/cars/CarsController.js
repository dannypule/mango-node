import db from '../../db-schema'
import { formatCarResponse, formatCarDbSave } from '../../controllers/cars/CarsService'

const CarsController = {}

CarsController.getCars = (req, res) => {
  db.Cars.findAll().then(cars => {
    const formatted = cars.map(formatCarResponse)
    res.send(formatted)
  })
}

CarsController.addCar = (req, res) => {
  const formatted = formatCarDbSave(req.body)

  db.Cars.create(formatted)
    .then(car => {
      res.send(car)
    })
    .catch(err => {
      res.status(500)
      res.send(err)
    })
}

CarsController.updateCar = (req, res) => {
  const car = req.body

  db.Cars.update(
    {
      Model: car.model,
      Year: car.year,
    },
    {
      where: {
        CarID: car.id,
      },
    },
  )
    .then(() => {
      return db.Cars.findOne({
        where: {
          CarID: req.body.id,
        },
      })
    })
    .then(car => res.send(formatCarResponse(car)))
    .catch(err => {
      res.status(500)
      res.send(err)
    })
}

CarsController.deleteCar = (req, res) => {
  db.Cars.destroy({
    where: {
      CarID: req.body.id,
    },
  })
    .then(() => {
      res.send({
        message: 'Successfully deleted car.',
      })
    })
    .catch(err => {
      res.status(500)
      res.send(err)
    })
}

export default CarsController
