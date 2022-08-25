/* Amplify Params - DO NOT EDIT
	API_SQUAREITYAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_SQUAREITYAPP_GRAPHQLAPIIDOUTPUT
	API_SQUAREITYAPP_GRAPHQLAPIKEYOUTPUT
	AUTH_SQUAREITYAPP219B5168_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const GRAPHQL_ENDPOINT = process.env.API_SQUAREITYAPP_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_SQUAREITYAPP_GRAPHQLAPIKEYOUTPUT;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import { default as fetch, Request } from 'node-fetch';

const baseUrl = 'https://connect.squareupsandbox.com/v2';

export const listTokens = /* GraphQL */ `
  query ListTokens($filter: ModelTokenFilterInput, $limit: Int, $nextToken: String) {
    listTokens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        accessToken
      }
      nextToken
    }
  }
`;

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers':
    'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Square-Version',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Origin': '*',
  'X-Requested-With': '*',
  'Square-Version': '*',
};

export const handler = async (event, context, callback) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log(`CONTEXT: ${JSON.stringify(context)}`);
  console.log(`CALLBACK: ${JSON.stringify(callback)}`);

  const path = event.path;
  const method = event.httpMethod;

  const [_, role, projectId, version, ...squarePaths] = path.split('/');

  let squarePath = squarePaths.join('/');
  const body = event.body ? JSON.parse(event.body || '') : null;
  let url = '';

  const options = { method, headers: { 'Content-Type': 'application/json' } };
  if (body && Object.keys(body).length !== 0) {
    options.body = JSON.stringify(body);
  }

  if (!path.includes('oauth')) {
    const tokenRequest = new Request(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'x-api-key': GRAPHQL_API_KEY,
      },
      body: JSON.stringify({
        query: listTokens,
        variables: {
          filter: {
            and: [
              {
                type: {
                  eq: role === 'seller' ? 'Seller' : 'Buyer',
                },
              },
              {
                projectTokensId: {
                  eq: projectId,
                },
              },
            ],
          },
        },
      }),
    });
    const fullResponse = await fetch(tokenRequest);
    const tokenResponse = await fullResponse.json();

    if (
      !tokenResponse?.data?.listTokens?.items ||
      tokenResponse?.data?.listTokens?.items.length === 0
    ) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ result: 'Token not found' }),
      };
    }

    const token = tokenResponse?.data.listTokens?.items[0]?.accessToken;

    options.headers.Authorization = `Bearer ${token}`;
    squarePath = version + '/' + squarePath;
    url = baseUrl.replace('v2', '') + squarePath;
  } else {
    url = baseUrl.replace('v2', '') + version + '/' + squarePath;
  }

  const response = await fetch(url, options);
  const data = await response.json();

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(data),
  };
};
