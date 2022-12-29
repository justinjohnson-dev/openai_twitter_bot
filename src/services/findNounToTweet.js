const fs = require('fs');

function findNounToTweet() {
  try {
    const config = require('../../scripts/testing.json');
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
  const fileName = 'J:\\Dev\\jj_dev_twitter_bot\\scripts\\testing.json';
  const file = require(fileName);

  file[noun] = true;

  fs.writeFile(fileName, JSON.stringify(file), (err) => {
    if (err) throw err;
    console.log('completed writing to file.');
  });
}

module.exports = {
  findNounToTweet,
  updateNounStatus,
};
