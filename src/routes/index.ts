import express from 'express';
const Route = express.Router();
const client = require('./client');

for (const property in client) {
  Route.use('/client', client[property]);
}


export default Route;