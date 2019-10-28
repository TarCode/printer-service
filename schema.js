const {gql} = require("apollo-server-lambda");

const addPrinter = require('./resolvers/create');
const viewPrinter = require('./resolvers/view');
const updatePrinter = require('./resolvers/update');
const listPrinters = require('./resolvers/list');
const removePrinter = require('./resolvers/remove');

const typeDefs = gql`
  type DeletePrinterResponse {
    message: String
  }
  enum StatusType {
    ACTIVE
    INACTIVE
  }
  type Printer {
    id: String!
    printerName: String!
    ipAddress: String!
    status: StatusType
  }
  type Query {
    printers: [Printer]
    printer(id: String!): Printer
  }
  type Mutation {
    addPrinter(printerName: String!, ipAddress: String!, status: StatusType): Printer
    updatePrinter(id: String!, printerName: String!, ipAddress: String!, status: StatusType): Printer
    removePrinter(id: String!): DeletePrinterResponse
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