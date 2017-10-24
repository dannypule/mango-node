import * as express from 'express';
const bodyParser = require('body-parser');

const usersRoute = require('./routes/users.routes');

const port = process.env.PORT || 5566;

const app = express();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/users', usersRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

export default app;
