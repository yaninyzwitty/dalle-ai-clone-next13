const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: process.env.OPEN_AI_ORGANISATION,
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = openai;