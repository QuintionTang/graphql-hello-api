const { ApolloServer, gql } = require("apollo-server");

const fibonacci = (length) => {
    let nums = [0, 1];
    for (let i = 2; i <= length; i++) {
        nums[i] = nums[i - 1] + nums[i - 2];
    }
    return nums;
};

const typeDefs = gql`
    type Query {
        fibonacci(length: Int!): [Int]
    }
`;

const resolvers = {
    Query: {
        fibonacci: (_, { length }) => {
            return fibonacci(length);
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(3005).then(({ url }) => {
    console.log(`🚀 GraphQL Server ready at ${url}`);
});
