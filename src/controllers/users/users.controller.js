import express from 'express';
import bcrypt from 'bcrypt';
import db from '../../db-schema';
import { formatGetUserResponse } from './users.helpers';

export const getUsers = async (req, res) => {
  db.Users.findAll().then(users => {
    const formattedUsers = users.map(formatGetUserResponse);
    res.send(formattedUsers);
  });
};

export const addUser = async (req, res) => {
  const user = req.body;

  const saltFactor = 7;

  const salt = await bcrypt
    .genSalt(saltFactor)
    // hash the password along with our new salt
    .then(salt => bcrypt.hash(user.Password, salt, null))
    // override the plain password with the hashed one
    .then(async hash => {
      user.Password = hash;

      db.Users.create(user, { individualHooks: true })
        .then(user => {
          res.send(user);
        })
        .catch(err => {
          res.status(500);
          res.send(err);
        });
    })
    .catch(err => {
      res.status(500);
      res.send(err);
    });
};

export const deleteUser = (req, res) => {
  db.Users.destroy({
    where: {
      Username: req.body.Username,
    },
  })
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(500);
      res.send(err);
    });
};
