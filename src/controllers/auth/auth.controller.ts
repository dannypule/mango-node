import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { Moment } from 'moment';
import db from '../../db-schema';
import appConfig from '../../config';

const env: string = process.env.NODE_ENV || 'development';
const config = appConfig[env];

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
      const tokenLifetime = 30; // expires in 30 days
      const token = jwt.sign({ id: user.UserID }, config.secret, {
        expiresIn: 86400 * tokenLifetime, // expires in tokenLifetime days
      });

      return Promise.all([
        db.UserTokens.create({
          Token: token,
          UserID: user.UserID,
          ExpiryDatetime: moment(new Date(), moment.ISO_8601).add(tokenLifetime, 'days'),
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

export const validateToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers['x-access-token'];

  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err: any, decoded: any) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    next();
  });
};
