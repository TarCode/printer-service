const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (data) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            name: data.name,
            ipAddress: data.ipAddress,
            id: uuid.v1(),
            status: 'ACTIVE'
        }
    };
    return dynamoDb.put(params).promise()
           .then(result => params.Item)
};