const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const cron = require('node-cron');
const { sendTweet } = require('./src/services/chat.service');
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

// Schedule tasks to be run on the server.
cron.schedule('0 */2 * * *', function () {
  sendTweet();
});

// NEED TO CREATE CONDITION TO TEXT/EMAIL ME IF WE RUN OUT OF WORDS
// IN THE FUTURE - OR BUILD SOMETHING TO AUTO CREATE MORE
// sendTweet();
