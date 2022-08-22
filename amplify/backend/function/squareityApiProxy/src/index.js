

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event, context, callback) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    console.log(`CONTEXT: ${JSON.stringify(context)}`);
    console.log(`CALLBACK: ${JSON.stringify(callback)}`);

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify('Hello from Lambda!'),
    };
};
