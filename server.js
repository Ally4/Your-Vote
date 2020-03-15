import express from 'express';
import bodyParser from 'body-parser';
import signsRouters from './server/routers/signsRouters';
import adminRouters from './server/routers/adminRouters';

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use('/', signsRouters);

app.use('/', adminRouters);


const port = process.env.PORT || 9876;

app.listen(port, () => {
  console.log(`The app is listened on the port ${port}`);
});

module.exports = app;
