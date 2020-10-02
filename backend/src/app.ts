import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import './database';
import uploadConfig from './config/upload.config';
import errorHandler from './middlewares/errors.middleware';
import '@shared/dependency-injection';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// it must be after routes to handle exceptions
app.use(errorHandler);

app.listen(3333, () => {
  console.log('Listening on port 3333');
});
