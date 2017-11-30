import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as TokenGenerator from 'uuid-token-generator';
import * as moment from 'moment';
import { Moment } from 'moment';
import db from '../../db-schema';

export const login = async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;

  db.Users.findOne({ where: { Username: username } })
    .then((user: any) => {
      if (bcrypt.compareSync(password, user.Password)) {
        return user;
      } else {
        res.status(401);
        res.send({
          message: 'Username and password do not match',
        });
      }
    })
    .then((user: any) => {
      const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
      const token = tokgen.generate();

      return Promise.all([
        db.UserTokens.create({
          Token: token,
          UserID: user.UserID,
          ExpiryDatetime: moment(new Date(), moment.ISO_8601).add(30, 'days'),
          LastUsedDatetime: moment(new Date(), moment.ISO_8601),
        }),
        user,
      ]);
    })
    .then((data: any[]) => {
      const [dbData, user] = data;
      res.send({
        token: dbData.Token,
        tokenExpiry: dbData.ExpiryDatetime,
      });
    });
};

export const getUsers = async (req: express.Request, res: express.Response) => {
  // db.Users.findAll().then((users: any[]) => {
  //   const formattedUsers: any[] = users.map(formatGetUserResponse);
  //   res.send(formattedUsers);
  // });
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
