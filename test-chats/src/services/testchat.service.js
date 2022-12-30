const { Configuration, OpenAIApi } = require('openai');
const { findNounToTweet, updateNounStatus } = require('./testFindNounToTweet');
require('dotenv').config();

const configuration = new Configuration({
  organization: process.env.organization,
  apiKey: process.env.openAIAPIKey,
});

const openai = new OpenAIApi(configuration);

async function testSystem() {
  const value = findNounToTweet();

  // logic to get noun from json file
  const message = value;
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Pretend you are a comedian. Answer as funny as possible. Answer hilariously.
  What is a ${message}?`,
    max_tokens: 100,
    temperature: 0,
  });

  // console.log(response.data);
  if (response.data) {
    if (response.data.choices) {
      // tweet(`Noun: ${message}` + response.data.choices[0].text);
      updateNounStatus(value);

      return 200;
    }
  }
}

module.exports = {
  testSystem,
};
