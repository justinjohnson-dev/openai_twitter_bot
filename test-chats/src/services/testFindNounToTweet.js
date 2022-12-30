const fs = require('fs');
const { resolve } = require('path');
const AWS = require('aws-sdk');
require('dotenv').config();

function findNounToTweet() {
  try {
    const config = require(resolve('scripts/testing.json'));
    const length_of_keys = Object.keys(config).length;

    let value = findRandomNumber(config, length_of_keys);
    let hasTheValueBeenTweeted = config[value];

    // max iterator
    let iterator = 0;
    while (hasTheValueBeenTweeted) {
      // what happens if all the words are used?
      if (iterator > length_of_keys) {
        return 'no_more_words';
      }

      value = findRandomNumber(config, length_of_keys);
      hasTheValueBeenTweeted = config[value];

      iterator++;
    }

    return value;
  } catch (e) {
    console.error(e);
  }
}

function findRandomNumber(config, length_of_keys) {
  const randomInteger = getRandomInt(length_of_keys);
  const value = Object.keys(config)[randomInteger];
  return value;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function updateNounStatus(noun) {
  const fileName = resolve('scripts/testing.json');
  const file = require(fileName);

  file[noun] = true;

  fs.writeFile(fileName, JSON.stringify(file), (err) => {
    if (err) throw err;
    console.log('completed writing to file.');
  });

  writeUpdatedFileToS3Bucket(file);
}

function writeUpdatedFileToS3Bucket(file) {
  const ID = process.env.awsAccessKey;
  const SECRET = process.env.awsAccessSecret;

  const BUCKET_NAME = 'twitter-openai-bot';

  const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
  });

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const timestamp =
    date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();

  // Uploading files to the bucket
  s3.putObject(
    {
      Bucket: BUCKET_NAME,
      Key: `${year}/${month}/${day}/${timestamp}/testing.json`,
      Body: JSON.stringify(file),
      ContentType: 'application/json',
    },
    function (err, data) {
      console.log(JSON.stringify(err) + ' ' + JSON.stringify(data));
    },
  );
}

module.exports = {
  findNounToTweet,
  updateNounStatus,
};
