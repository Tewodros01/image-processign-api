import express from 'express';
import routes from './routes/index';
import logger from './utilities/logger';
import path from 'path';

const app = express();

const port = 3000;

//provide a front-end page that displays a thumbnail directory
app.get(
  '/',
  logger,
  async (req: express.Request, res: express.Response): Promise<void> => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }
);

//add an API entry point, apply the router and logger as middleware
app.use('/image', logger, routes);

//listen to port and output message to console
app.listen(port, () => {
  console.log('Server started at localhost:' + port);
});

export default app;
