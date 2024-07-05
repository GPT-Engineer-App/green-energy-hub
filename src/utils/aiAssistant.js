import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getRecommendations = async (calcResults) => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Provide recommendations based on the following solar panel calculation results: ${JSON.stringify(calcResults)}`,
    max_tokens: 150,
  });
  return response.data.choices[0].text;
};