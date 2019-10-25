const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (data) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            id: uuid.v1(),
            name: data.name,
            ipAddress: data.ipAddress,
            status: data.status,
            createdAt: Date.now(),
        }
    };
    return dynamoDb.put(params).promise()
           .then(result => params.Item)
};