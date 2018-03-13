import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// import authRoute from './routes/auth/auth.route';
import usersRoute from './routes/users/users.route';
import salesRoute from './routes/sales/sales.route';
import carsRoute from './routes/cars/cars.route';

const port = process.env.PORT || 5566;
const node_env = process.env.NODE_ENV;

const app = express();

// setup cors in prod
// if (node_env === 'production') {
//   const whitelist = ['https://angular-offline-ready-app.herokuapp.com', 'https://node-postgres-api.herokuapp.com'];
//   const corsOptions = {
//     origin: function(origin: any, callback: any) {
//       if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//   };

//   app.use(cors(corsOptions));
// }

// setup cors
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
  );
  next();
});

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/users', usersRoute);
app.use('/api/sales', salesRoute);
app.use('/api/cars', carsRoute);

app.use('/', (req, res) => {
  res.send('up');
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

export default app;
