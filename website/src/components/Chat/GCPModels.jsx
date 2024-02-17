/**
 * TODO(developer): Uncomment these variables before running the sample.\
 * (Not necessary if passing values as arguments)
 */
const project = 'jp-website-410806';
const location = 'europe-west1';
const aiplatform = require('@google-cloud/aiplatform');

// Imports the Google Cloud Prediction service client
const {PredictionServiceClient} = aiplatform.v1;

// Import the helper module for converting arbitrary protobuf.Value objects.
const {helpers} = aiplatform;

// Specifies the location of the api endpoint
const clientOptions = {
  apiEndpoint: 'europe-west1-aiplatform.googleapis.com',
};

const publisher = 'google';
const model = 'text-bison@002';

// Instantiates a client
const predictionServiceClient = new PredictionServiceClient(clientOptions);

async function callPredict({prompt_str}) {
  // Configure the parent resource
  const endpoint = `projects/${project}/locations/${location}/publishers/${publisher}/models/${model}`;

  const prompt = {
    prompt:
      {prompt_str},
  };
  const instanceValue = helpers.toValue(prompt);
  const instances = [instanceValue];

  const parameter = {
    temperature: 0.9,
    maxOutputTokens: 256,
    topP: 0.95,
    topK: 40,
  };
  const parameters = helpers.toValue(parameter);

  const request = {
    endpoint,
    instances,
    parameters,
  };

  // Predict request
  const response = await predictionServiceClient.predict(request);
  console.log('Get text prompt response');
  console.log(response);
}

export default callPredict();