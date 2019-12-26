var express = require('express');
const mongoose = require('mongoose');
const connection = require('./DB_connection/db_connection').connection;

const router= require('./router').router;
const app = express();
const port = 8080;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/',router);
app.listen(port);
console.log(`listening on port ${port}`);