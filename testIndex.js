const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { testSystem } = require('./test-chats/src/services/testchat.service');
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

testSystem();
