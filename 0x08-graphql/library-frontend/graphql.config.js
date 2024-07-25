export default {
  schema: "../library/src/schema.gql",
  documents: "../library/graphql/*.gql",
  extensions: {
    endpoints: {
      default: {
        url: "http://localhost:4000/graphql",
      },
    },
  },
};
