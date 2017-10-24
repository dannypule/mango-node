import * as express from 'express';
import * as bcrypt from 'bcrypt';
import db from '../models';
const router = express.Router();

// ===================================================
// ROUTE '/api/users'
// =========================
router.get('/', (req, res) => {
  // // force: true will drop the table if it already exists
  // db.Users.sync({ force: true }).then(() => {
  //   // Table created
  //   return db.Users.create({
  //     FirstName: 'John',
  //     LastName: 'Hancock',
  //     Username: 'JohnHancock',
  //     Password: 'S3cr3t',
  //   });
  // });
  db.Users.findAll().then((users: any[]) => {
    // debugger;
    res.send(users);
  });
});

router.post('/', async (req, res) => {
  // models.Users.findAll().then((users: any[]) => {
  //   // debugger;
  //   res.send(req.body);
  // });
  const user = req.body;

  const saltFactor = 7;

  const salt = await bcrypt
    .genSalt(saltFactor)
    // hash the password along with our new salt
    .then(salt => bcrypt.hash(user.Password, salt, null))
    // override the plain password with the hashed one
    .then(async hash => {
      user.Password = hash;

      db.Users
        .create(user, { individualHooks: true })
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
});

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

module.exports = router;
