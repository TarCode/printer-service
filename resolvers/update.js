const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (data) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
          id: data.id
        },
        UpdateExpression: "SET name = :name, ipAddress = :ipAddress, status = :status",
        ExpressionAttributeValues: {
          ":ipAddress": data.ipAddress || null,
          ":name": data.name || null,
          ":status": data.status || 'ACTIVE'
        },
        ReturnValues: "ALL_NEW"
      };
    return dynamoDb.put(params).promise()
           .then(result => params)
};

