import db from '../../models'
import { formatCarResponse, formatCarDbSave } from '../../controllers/cars/CarsService'
import utils from '../../utils/utils'

const CarsController = {}

CarsController.getCars = async (req, res) => {
  try {
    console.log(null)
    const cars = await db.Cars.findAll()
    const formatted = cars.map(formatCarResponse)
    utils.success(res, formatted)
  } catch (err) {
    utils.success(res, err)
  }
}

CarsController.addCar = async (req, res) => {
  const formatted = formatCarDbSave(req.body)

  try {
    const car = await db.Cars.create(formatted)
    utils.success(res, car)
  } catch (err) {
    utils.error(res, err)
  }
}

CarsController.updateCar = async (req, res) => {
  const car = req.body

  try {
    await db.Cars.update(
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
    const _car = await db.Cars.findOne({
      where: {
        CarID: req.body.id,
      },
    })
    utils.success(res, _car) // todo - format _car
  } catch (err) {
    utils.error(res, err)
  }
}

CarsController.deleteCar = async (req, res) => {
  try {
    await db.Cars.destroy({
      where: {
        CarID: req.body.id,
      },
    })
    utils.success(res, {
      message: 'Successfully deleted car.',
    })
  } catch (err) {
    utils.error(res, err)
  }
}

export default CarsController
