import * as express from 'express';
import * as bcrypt from 'bcrypt';
import db from '../../db-schema';
import { formatGetUserResponse } from './users.helpers';

export const getUsers = async (req: express.Request, res: express.Response) => {
  db.Users.findAll().then((users: any[]) => {
    const formattedUsers: any[] = users.map(formatGetUserResponse);
    res.send(formattedUsers);
  });
};

export const addUser = async (req: express.Request, res: express.Response) => {
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
        .then((user: any) => {
          res.send(user);
        })
        .catch((err: any) => {
          res.status(500);
          res.send(err);
        });
    })
    .catch((err: any) => {
      res.status(500);
      res.send(err);
    });
};

export const deleteUser = (req: express.Request, res: express.Response) => {
  db.Users.destroy({
    where: {
      Username: req.body.Username,
    },
  })
    .then((user: any) => {
      res.send(user);
    })
    .catch((err: any) => {
      res.status(500);
      res.send(err);
    });
};
