import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());

app.use(bodyParser.json());


const port = process.env.PORT || 9876;

app.listen(port, () => {
  console.log(`The app is listened on the port ${port}`);
});

module.exports = app;
