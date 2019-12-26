var express = require('express');
const mongoose = require('mongoose');
const connection = require('./DB_connection/db_connection').connection;

const router= require('./router').router;
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/',router);
app.listen(port);
console.log(`listening on port ${PORT}`);
