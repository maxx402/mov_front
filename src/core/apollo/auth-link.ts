import { ApolloLink } from "@apollo/client";

export function createAuthLink(getToken: () => string | null): ApolloLink {
  return new ApolloLink((operation, forward) => {
    const token = getToken();
    if (token) {
      operation.setContext(({ headers = {} }: { headers?: Record<string, string> }) => ({
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      }));
    }
    return forward(operation);
  });
}
