export const env = {
  graphqlEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "http://localhost:8000/graphql",
} as const;
