import express from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
import lusca from 'lusca';
import dotenv from 'dotenv';
import expressValidator from 'express-validator';
import { checkSchema } from 'express-validator/check';
import serverless from 'serverless-http';
import morgan from 'morgan';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

// Controllers (route handlers)
import * as orderController from './controllers/order';

// Create Express server
const app = express();
const router = express.Router();

// Express configuration
app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(morgan('short'));

/**
 * Primary app routes.
 */

router.get('/', (req, res) => res.sendStatus(200));
router.get('/orders', orderController.allOrders);
router.post(
  '/orders',
  orderController.orderValidationSchema,
  orderController.createOrder
);
router.post('/orders/test', orderController.test);
router.get('/orders/update', orderController.updateOrder);
app.use('/.netlify/functions/app', router);

export default app;

export const handler = serverless(app);
