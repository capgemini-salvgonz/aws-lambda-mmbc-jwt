require('dotenv').config();
const queryString = require('querystring');
const mfa = require('./services/mongodb.mmbc.service');


module.exports.handler = async (event) => {

  const { userName, mfaCode } = JSON.parse(event['body']);
  const headers = {
    'Access-Control-Allow-Origin': '*'
  };

  const response = await mfa.getJwt({ userName, mfaCode })
    .then(response => {
      if (response.jwt) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(response.jwt),
        }
      }
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Bad request [code]'})
      }
    })
    .catch(error => {
      console.error(error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify(error),
      }
    });

  return response;
};
