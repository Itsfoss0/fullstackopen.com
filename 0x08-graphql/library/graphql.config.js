module.exports = {
  schema: "./src/schema.gql",
  documents: "./graphql/*.gql",
  extensions: {
    endpoints: {
      default: {
        url: "http://localhost:4000/graphql",
      },
    },
  },
};
