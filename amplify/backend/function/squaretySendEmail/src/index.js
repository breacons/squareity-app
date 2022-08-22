/* Amplify Params - DO NOT EDIT
	API_SQUAREITYAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_SQUAREITYAPP_GRAPHQLAPIIDOUTPUT
	API_SQUAREITYAPP_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const aws = require('aws-sdk');
const ses = new aws.SES();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const body = JSON.parse(event.body)

  const link = `http://localhost:3000/${body.slug}/booking/${body.appointmentProposalId}`
  console.log(link)
  const result = await ses
    .sendEmail({
      Destination: {
        ToAddresses: [process.env.SES_EMAIL],
      },
      Source: process.env.SES_EMAIL,
      Message: {
        Subject: { Data: 'Book donation pickup' },
        Body: {
          Text: { Data: `Book appointment: ${link}` },
          Html: { Data: `<p>Book appointment for donation pickup <a href="${link}">${link}</a></p>`}
        },
      },
    })
    .promise();

  return {
    statusCode: 200,
    //Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    },
    body: JSON.stringify({...result, link}),
  };
};
