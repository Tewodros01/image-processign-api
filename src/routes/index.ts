import express from 'express'; // Express server module
import images from './api/images';

// create the Router object
const routes = express.Router();

routes.get('/', images);

// export the routes object
export default routes;
