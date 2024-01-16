import express from 'express';
const Route = express.Router();
const client = require('./client');
const admin = require('./admin');

for (const property in client) {
  Route.use('/client', client[property]);
}
for (const property in admin) {
  Route.use('/admin', admin[property]);
}


export default Route;