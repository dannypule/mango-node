import * as express from 'express';
import * as bodyParser from 'body-parser';

// import authRoute from './routes/auth/auth.route';
import usersRoute from './routes/users/users.route';

const port = process.env.PORT || 5566;

const app = express();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/users', usersRoute);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

export default app;
