import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
const bearerToken = require('express-bearer-token');
import {router as equipementRouter} from './equipement'
import {oktaAuth} from './authentication'

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bearerToken())
  .use(oktaAuth)
  .use(equipementRouter);
//Definition du port de lancement
app.listen(4387, () => {
  return console.log('Api disponible sur le port 4387');
});