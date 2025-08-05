import dotenv from 'dotenv';
import 'tsconfig-paths/register';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import appConfig from '@config/app-config';
import { AuthRouter } from '@routes/auth-routes';


const PORT = appConfig.port;
const HOST = process.env.HOST;
const app = express();

const startServer = async () => {
  try {
    //await db.connect();

    app.use(morgan('dev'));
    app.use(
      cors({
        origin: `http://localhost:5173`,
        credentials: true,
      })
    );

    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({extended: true}))

    app.use('/api/hello', (req, res) => {
      res.send('hello from server');
    });

    app.use('/api/auth', AuthRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error(`Failed to start server ${err}`);
    process.exit(1);
  }
};

startServer();
