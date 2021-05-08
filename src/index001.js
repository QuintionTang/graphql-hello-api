const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => {
            return "Hello World!";
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(3005).then(({ url }) => {
    console.log(`🚀 GraphQL Server ready at ${url}`);
});
