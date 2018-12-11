import express from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import dotenv from "dotenv";
import expressValidator from "express-validator";
import { checkSchema } from "express-validator/check";
import serverless from "serverless-http";


// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

// Controllers (route handlers)
import * as orderController from "./controllers/order";

// Create Express server
const app = express();
const router = express.Router();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

/**
 * Primary app routes.
 */

const orderCheckSchema = checkSchema({
  items: {
    in: ["body"],
    isLength: {
      errorMessage: "El carrito debe contener al menos un objeto",
      options: { min: 1 },
    },
    optional: false,
  },
  "items.*.id": {
    in: ["body"],
    errorMessage: "Cada producto debe contener un identificador.",
    isString: {
      errorMessage: "El identificador de un producto debe ser un string.",
    },
    optional: false,
  },
  "items.*.colorId": {
    in: ["body"],
    errorMessage: "Cada producto debe contener un identificador de color.",
    isString: {
      errorMessage: "El identificador de un color debe ser un string.",
    },
    optional: false,
  },
  "items.*.fraganceId": {
    in: ["body"],
    errorMessage: "Cada producto debe contener un identificador de fragancia.",
    isString: {
      errorMessage: "El identificador de una fragancia debe ser un string.",
    },
    optional: false,
  },
  "items.*.amount": {
    in: ["body"],
    errorMessage: "Cada producto debe contener una cantidad.",
    isInt: {
      errorMessage: "El valor de amount debe ser numérico.",
    },
    toInt: true,
    optional: false,
  },
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get("/", (req, res) => res.sendStatus(200));
router.get("/orders", orderController.allOrders);
router.post("/orders", orderCheckSchema, orderController.createOrder);
router.post("/orders/test", orderCheckSchema, orderController.testCreateOrder);
router.get("/orders/update", orderController.updateOrder);
app.use("/.netlify/functions/server", router);

export default app;

export const handler = serverless(app);