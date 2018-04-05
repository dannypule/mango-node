// import express from 'express'
import db from '../../db-schema'
import { formatCarResponse, formatCarDbSave } from '../../controllers/cars/cars.helpers'

export const getCars = (req, res) => {
  debugger
  db.Cars.findAll().then(cars => {
    const formatted = cars.map(formatCarResponse)
    res.send(formatted)
  })
}

export const addCar = (req, res) => {
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

export const updateCar = (req, res) => {
  const car = req.body

  db.Cars.update(
    {
      Model: car.model,
      Year: car.year
    },
    {
      where: {
        CarID: car.id
      }
    }
  )
    .then(() => {
      return db.Cars.findOne({
        where: {
          CarID: req.body.id
        }
      })
    })
    .then(car => res.send(formatCarResponse(car)))
    .catch(err => {
      res.status(500)
      res.send(err)
    })
}

export const deleteCar = (req, res) => {
  db.Cars.destroy({
    where: {
      CarID: req.body.id
    }
  })
    .then(() => {
      res.send({
        message: 'Successfully deleted car.'
      })
    })
    .catch(err => {
      res.status(500)
      res.send(err)
    })
}
