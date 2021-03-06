const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (data) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
          id: data.id
        },
        UpdateExpression: "SET printerName = :printerName, ipAddress = :ipAddress, printerStatus = :printerStatus",
        ExpressionAttributeValues: {
          ":ipAddress": data.ipAddress,
          ":printerName": data.printerName,
          ":printerStatus": data.printerStatus || 'ACTIVE'
        },
        ReturnValues: "ALL_NEW"
      };
    return dynamoDb.update(params).promise()
           .then(r => data)
};

