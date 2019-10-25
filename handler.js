const {ApolloServer} = require("apollo-server-lambda");
const {typeDefs, resolvers} = require('./schema');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  })
});

exports.graphql = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});