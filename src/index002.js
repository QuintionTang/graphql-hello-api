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
        today: String
        random: Float!
        fibonacci: [Int]
    }
`;

const resolvers = {
    Query: {
        today: () => {
            return new Date().toDateString();
        },
        random: () => {
            return 0;
        },
        fibonacci: () => {
            return fibonacci(10);
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(3005).then(({ url }) => {
    console.log(`🚀 GraphQL Server ready at ${url}`);
});
