import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import passport from 'passport';
// import cors from 'cors'
import responseUtils from './utils/responseUtils';

import apiRoutes from './routes/routes';

// ////////////////////////////////////////
// create app
// ////////////////////////////////////////
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

// ////////////////////////////////////////
// setup cors
// ////////////////////////////////////////
app.use((req, res, next) => {
  // allowed sites
  res.header('Access-Control-Allow-Origin', '*'); // todo - set specific domains

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.header('Access-Control-Allow-Credentials', 'true');

  // allowed request methods
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  // allowed headers
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,Authorization',
  );
  next();
});

// ////////////////////////////////////////
// logger
// ////////////////////////////////////////
app.use(logger('dev'));

// ////////////////////////////////////////
// Parse incoming requests data (https://github.com/expressjs/body-parser)
// ////////////////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ////////////////////////////////////////
// Passport
// ////////////////////////////////////////
app.use(passport.initialize());

// ////////////////////////////////////////
// setup routes
// ////////////////////////////////////////
app.use('/api', apiRoutes);

// ////////////////////////////////////////
// ping endpoint
// ////////////////////////////////////////
app.use('/', (req, res) => {
  responseUtils.success(res, 'PONG');
});

export default app;
