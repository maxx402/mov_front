import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { env } from "@/core/config/env";
import { createAuthLink } from "./auth-link";
import { createErrorLink } from "./error-link";

let apolloClient: ApolloClient | null = null;

export function getApolloClient(
  getToken: () => string | null,
  onUnauthenticated?: () => void,
): ApolloClient {
  if (apolloClient) return apolloClient;

  const httpLink = new BatchHttpLink({
    uri: env.graphqlEndpoint,
    batchMax: 5,
    batchInterval: 20,
  });

  const authLink = createAuthLink(getToken);
  const errorLink = createErrorLink(onUnauthenticated);

  apolloClient = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: { fetchPolicy: "cache-first" },
      mutate: { fetchPolicy: "no-cache" },
    },
  });

  return apolloClient;
}

export function resetApolloClient(): void {
  if (apolloClient) {
    apolloClient.clearStore();
    apolloClient = null;
  }
}
