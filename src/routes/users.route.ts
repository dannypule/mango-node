import * as express from 'express';
import * as bcrypt from 'bcrypt';
import db from '../models';
import { getUsers, addUser, deleteUser } from '../controllers/users.controller';
const router = express.Router();

// ===================================================
// ROUTE '/api/users'
// =========================
router.get('/', getUsers);

router.post('/', addUser);

router.put('/', async (req, res) => {
  db.Users
    .findOne({
      where: {
        Username: req.body.Username,
      },
    })
    .then((user: any) => {
      bcrypt.compare(req.body.Password, user.Password, (err, r) => {
        if (err) {
          res.status(500);
          res.send({ err: err });
          return;
        }

        if (r) {
          res.send({ status: `You're logged in.` });
          return;
        } else {
          res.status(500);
          res.send({ status: `Couldn't log in` });
          return;
        }
      });
    })
    .catch((err: any) => {
      res.status(500);
      res.send(err);
    });
});

router.delete('/', deleteUser);

export default router;
