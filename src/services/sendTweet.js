const rwClient = require('./twitterClient');

async function tweet(msg) {
  try {
    await rwClient.v2.tweet(msg);
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  tweet,
};
