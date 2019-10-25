const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLEnumType
} = require('graphql');
const addPrinter = require('./resolvers/create');
const viewPrinter = require('./resolvers/view');
const updatePrinter = require('./resolvers/update');
const listPrinters = require('./resolvers/list');
const removePrinters = require('./resolvers/remove');

const PrinterStatusType = new GraphQLEnumType({
    name: 'PrinterStateEnum',
    values: {
        INACTIVE: {
            value: 0,
        },
        ACTIVE: {
            value: 1,
        }
    },
});

const printerType = new GraphQLObjectType({
    name: 'Printer',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        ipAddress: { type: new GraphQLNonNull(GraphQLString) },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        status: {
            type: PrinterStatusType
        },
    }
});


const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            listPrinters: {
                type: new GraphQLList(printerType),
                resolve: (parent, args) => listPrinters()
            },
            viewPrinter: {
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) }
                },
                type: printerType,
                resolve: (parent, args) => viewPrinter(args.id)
            }
        }
    }),

    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createPrinter: {
                args: {
                    name: { type: new GraphQLNonNull(GraphQLString) },
                    ipAddress: { type: new GraphQLNonNull(GraphQLString) },
                    status: { type: new GraphQLNonNull(PrinterStatusType) }
                },
                type: printerType,
                resolve: (parent, args) => addPrinter(args)
            },
            updatePrinter: {
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) },
                    name: { type: new GraphQLNonNull(GraphQLString) },
                    ipAddress: { type: new GraphQLNonNull(GraphQLString) },
                    status: { type: new GraphQLNonNull(PrinterStatusType) }
                },
                type: printerType,
                resolve: (parent, args) => updatePrinter(args)
            },
            removePrinters: {
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) }
                },
                type: GraphQLBoolean,
                resolve: (parent, args) => removePrinters(args.id)
            }
        }
    })
});

module.exports = schema;