const {gql} = require("apollo-server-lambda");

const addPrinter = require('./resolvers/create');
const viewPrinter = require('./resolvers/view');
const updatePrinter = require('./resolvers/update');
const listPrinters = require('./resolvers/list');
const removePrinter = require('./resolvers/remove');

const typeDefs = gql`
  type PrinterResponse {
    message: String
  }
  enum StatusType {
    ACTIVE
    INACTIVE
  }
  type Printer {
    id: String!
    name: String!
    ipAddress: String!
    status: StatusType
  }
  type Query {
    printers: [Printer]
    printer(id: String!): Printer
  }
  type Mutation {
    addPrinter(name: String!, ipAddress: String!, status: StatusType): Printer
    updatePrinter(id: String!, name: String!, ipAddress: String!, status: StatusType): PrinterResponse
    removePrinter(id: String!): PrinterResponse
  }
`;

const resolvers = {
  Query: {
    printers: () => {
      return listPrinters()
    },
    printer: (_, {id}) => {
      return viewPrinter(id)
    }
  },
  Mutation: {
    addPrinter: (_, args) => {
      return addPrinter(args)
    },
    updatePrinter: (_, args) => {
      return updatePrinter(args)
    },
    removePrinter: async (_, args) => {
      await removePrinter(args.id)
      return "Deleted"
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};