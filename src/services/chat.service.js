const { Configuration, OpenAIApi } = require("openai");
const { tweet } = require("./sendTweet");
const { findNounToTweet, updateNounStatus } = require("./findNounToTweet");
require("dotenv").config();

const configuration = new Configuration({
  organization: process.env.organization,
  apiKey: process.env.openAIAPIKey,
});

const openai = new OpenAIApi(configuration);

async function sendTweet() {
  try {
    const value = findNounToTweet();

    const message = value;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Pretend you are a comedian. Answer as funny as possible. Answer hilariously.
              What is a ${message}?`,
      max_tokens: 100,
      temperature: 0,
    });

    const firstChoice = response.data.choices[0];

    if (!firstChoice) throw "no choices returned";

    tweet(
      `Noun: ${message}` +
        firstChoice.text +
        "\n\n\n #technology #innovation #chatGPT #openai #programming",
    );
    updateNounStatus(value);

    return 200;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  sendTweet,
};
