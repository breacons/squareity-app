import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

import appSyncConfig from '../aws-exports';

/* The HTTPS endpoint of the AWS AppSync API
(e.g. *https://aaaaaaaaaaaaaaaaaaaaaaaaaa.appsync-api.us-east-1.amazonaws.com/graphql*).
[Custom domain names](https://docs.aws.amazon.com/appsync/latest/devguide/custom-domain-name.html) can also be supplied here (e.g. *https://api.yourdomain.com/graphql*).
Custom domain names can have any format, but must end with `/graphql`
(see https://graphql.org/learn/serving-over-http/#uris-routes). */
const url = appSyncConfig.aws_appsync_graphqlEndpoint;

const region = appSyncConfig.aws_appsync_region;

const auth = {
  type: appSyncConfig.aws_appsync_authenticationType,
  apiKey: appSyncConfig.aws_appsync_apiKey,

  // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
  // credentials: async () => credentials, // Required when you use IAM-based auth.
} as any;

const httpLink = new HttpLink({ uri: url });

const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
]);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true // TODO: remove from prod
});

export const ApolloWrapper = ({ children }) => {
  return
};
