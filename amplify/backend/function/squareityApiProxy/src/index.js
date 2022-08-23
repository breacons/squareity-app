/* Amplify Params - DO NOT EDIT
	API_SQUAREITYAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_SQUAREITYAPP_GRAPHQLAPIIDOUTPUT
	API_SQUAREITYAPP_GRAPHQLAPIKEYOUTPUT
	AUTH_SQUAREITYAPP219B5168_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import { default as fetch, Request } from 'node-fetch';
const SQUARE_SELLER_ACCESS_TOKEN =
  'EAAAEEHSWolGMG8LQRMBWAyost5B78E-Q57RgA9Sy7apTD1VnA_Q4HGQOWHTG6Xy';
const SQUARE_BUYER_TOKEN = 'EAAAEDnDUm5NnOuILtMEVC29bnJ-4vyqS9JDy8Rk_YEO_KpWGTqQi7n6aV468mLd';

const baseUrl = 'https://connect.squareupsandbox.com/v2';
export const handler = async (event, context, callback) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log(`CONTEXT: ${JSON.stringify(context)}`);
  console.log(`CALLBACK: ${JSON.stringify(callback)}`);

  const { path, method } = event.requestContext.http;
  const [_, role, slug, version, ...squarePaths] = path.split('/');
  let squarePath = squarePaths.join('/');

  const body = JSON.parse(event.body);
  let url = '';

  const options = { method, headers: { 'Content-Type': 'application/json' } };
  if (Object.keys(body).length !== 0) {
    options.body = JSON.stringify(body);
  }

  if (!squarePath.includes('oauth')) {
    options.headers.Authorization = `Bearer ${
      role === 'seller' ? SQUARE_SELLER_ACCESS_TOKEN : SQUARE_BUYER_TOKEN
    }`;
    squarePath = version + '/' + squarePath;
    url = baseUrl.replace('v2', '') + squarePath;
  } else {
    url = baseUrl + '/' + squarePath;
  }

  console.log({url, options, method, body})
  const response = await fetch(url, options);
  const data = await response.json();

  console.log({response, data})
  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: data,
  };
};
