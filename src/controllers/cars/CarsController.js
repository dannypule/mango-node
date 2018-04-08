import db from '../../models'
import { formatCarResponse, formatCarDbSave } from '../../controllers/cars/CarsService'
import utils from '../../utils/utils'

const CarsController = {}

CarsController.getCars = (req, res) => {
  db.Cars.findAll().then(cars => {
    const formatted = cars.map(formatCarResponse)
    utils.success(res, formatted)
  })
}

CarsController.addCar = (req, res) => {
  const formatted = formatCarDbSave(req.body)

  db.Cars.create(formatted)
    .then(car => {
      utils.success(res, car)
    })
    .catch(err => {
      utils.success(res, err)
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
    .then(car => utils.success(res, car))
    .catch(err => {
      utils.error(res, err)
    })
}

CarsController.deleteCar = (req, res) => {
  db.Cars.destroy({
    where: {
      CarID: req.body.id,
    },
  })
    .then(() => {
      utils.success(res, {
        message: 'Successfully deleted car.',
      })
    })
    .catch(err => {
      utils.error(res, err)
    })
}

export default CarsController
