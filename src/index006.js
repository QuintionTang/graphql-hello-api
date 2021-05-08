const { ApolloServer, gql } = require("apollo-server");
const { nanoid } = require("nanoid");

const typeDefs = gql`
    input SiteInput {
        title: String
        author: String
        url: String
    }

    type SiteDetail {
        id: ID!
        title: String
        author: String
        url: String
    }

    type Query {
        getSite(id: ID!): SiteDetail
    }

    type Mutation {
        createSite(input: SiteInput): SiteDetail
        updateSite(id: ID!, input: SiteInput): SiteDetail
    }
`;

class SiteDetail {
    constructor(id, { author, title, url }) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.url = url;
    }
}

const fakeDb = {};

const resolvers = {
    Mutation: {
        createSite: (_, { input }) => {
            var id = nanoid();

            fakeDb[id] = input;
            return new SiteDetail(id, input);
        },
        updateSite: (_, { id, input }) => {
            if (!fakeDb[id]) {
                throw new Error("信息不存在 " + id);
            }
            fakeDb[id] = input;
            return new SiteDetail(id, input);
        },
    },
    Query: {
        getSite: (_, { id }) => {
            if (!fakeDb[id]) {
                throw new Error("信息不存在 " + id);
            }
            return new SiteDetail(id, fakeDb[id]);
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(3005).then(({ url }) => {
    console.log(`🚀 GraphQL Server ready at ${url}`);
});
