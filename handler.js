
  const { graphql } = require('graphql');
  const schema = require('./schema');

  module.exports.queryPrinters = (event, context, callback) => {
      graphql(schema, event.body)
      .then(result => (
          callback(
            null, 
            {
              statusCode: 200, 
              'Content-Type': 'application/json', 
              'Access-Control-Allow-Origin': '*',  
              body: JSON.stringify(result)
            }
          )
        )
      )
      .catch(callback);
  };