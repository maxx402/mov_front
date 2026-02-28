import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/data/graphql/schema.graphql",
  documents: ["src/data/graphql/operations/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "src/data/graphql/__generated__/": {
      preset: "client",
      config: {
        documentMode: "documentNode",
        strictScalars: true,
        scalars: {
          DateTime: "string",
          Date: "string",
          Upload: "File",
          JSON: "Record<string, unknown>",
        },
      },
    },
  },
};

export default config;
