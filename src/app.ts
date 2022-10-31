import express from "express";
import cors from 'cors';
import { log } from 'debug';
import expressWinston from 'express-winston';
import winston from 'winston';
import dotenv from "dotenv";
import CommonRoutes from "./api/http/routes/Common.routes";

dotenv.config();

const app: express.Application = express();

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
      winston.format.json(),
      winston.format.prettyPrint(),
      winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false;
};

app.use(expressWinston.logger(loggerOptions));

const routes: Array<CommonRoutes> = [];

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  routes.forEach((route: CommonRoutes) => {
    log(`Routes configured for ${route.getName()}`);
  });
  log('Server listening on port ' + PORT);
});