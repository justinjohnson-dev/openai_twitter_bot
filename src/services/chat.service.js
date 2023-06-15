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
    const messageValue = findNounToTweet();

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Pretend you are a comedian. Answer as funny as possible. Answer hilariously.
              What is a ${messageValue}?`,
      max_tokens: 90,
      temperature: 0,
    });

    const firstChoice = response.data.choices[0];

    if (!firstChoice) throw "no choices returned";

    tweet(
      `Noun: ${messageValue}` +
        firstChoice.text +
        "\n\n\n #technology #innovation #chatGPT #openai #programming",
    );
    updateNounStatus(messageValue);

    return 200;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  sendTweet,
};
