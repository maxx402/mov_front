import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors, ServerError } from "@apollo/client/errors";

export function createErrorLink(onUnauthenticated?: () => void) {
  return new ErrorLink(({ error }) => {
    if (CombinedGraphQLErrors.is(error)) {
      for (const err of error.errors) {
        const code = err.extensions?.["code"];
        const status = err.extensions?.["status"];
        if (code === "UNAUTHENTICATED" || status === 401) {
          onUnauthenticated?.();
          return;
        }
        console.error(`[GraphQL error]: ${err.message}`, err);
      }
    } else if (ServerError.is(error)) {
      if (error.statusCode === 401) {
        onUnauthenticated?.();
        return;
      }
      console.error(`[Network error]: ${error.message}`);
    } else {
      console.error(`[Error]: ${error.message}`);
    }
  });
}
