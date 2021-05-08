const { ApolloServer, gql } = require("apollo-server");

/**
 * 定义一个基础查询，返回查询RandomDie
 */
const typeDefs = gql`
    type RandomDie {
        numSides: Int!
        rollOnce: Int!
        roll(numRolls: Int!): [Int]
    }
    type Query {
        getDie(numSides: Int): RandomDie
    }
`;
class RandomDie {
    constructor(numSides) {
        this.numSides = numSides;
    }
    rollOnce() {
        return 1 + Math.floor(Math.random() * this.numSides);
    }
    roll({ numRolls }) {
        const output = [];
        for (let i = 0; i < numRolls; i++) {
            output.push(this.rollOnce());
        }
        return output;
    }
}
const resolvers = {
    Query: {
        getDie: (_, { numSides }) => {
            return new RandomDie(numSides || 6);
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(3005).then(({ url }) => {
    console.log(`🚀 GraphQL Server ready at ${url}`);
});
