import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import dotenvConfig from './config/dotenv.config';


class App {
  constructor() {
    dotenvConfig();
    this.express = express();
    this.middlewares();
    this.routes();
  }

  routes() {

  }

  middlewares() {
    this.express.use(helmet());
    this.express.use(express.json());
    this.express.use(cors());
  }
}

export default new App().express;
