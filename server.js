import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './server/routers/auth';
import allRoutes from './server/routers';

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use('/', authRoutes, allRoutes);
app.use((_req, res) => {
  res.status(404).json({ status: 404, error: { message: 'Page doesn\'t exists' } });
});

const port = process.env.PORT || 9876;

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

module.exports = app;
