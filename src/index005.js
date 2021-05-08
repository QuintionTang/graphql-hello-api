const { ApolloServer, gql } = require("apollo-server");

const fakeDb = {};

const typeDefs = gql`
    type Mutation {
        setTitle(title: String): String
    }
    type Query {
        getTitle: String
    }
`;

const resolvers = {
    Mutation: {
        setTitle: (_, { title }) => {
            fakeDb.title = title;
            return title;
        },
    },
    Query: {
        getTitle: () => {
            return fakeDb.title;
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(3005).then(({ url }) => {
    console.log(`🚀 GraphQL Server ready at ${url}`);
});
