import * as express from 'express';
import models from '../models';
const router = express.Router();

router.get('/', function(req, res) {
  models.Users.findAll().then((users: any[]) => {
    debugger;
    // res.render('index', {
    //   title: 'Sequelize: Express Example',
    //   users: users,
    // });
  });
});

module.exports = router;
