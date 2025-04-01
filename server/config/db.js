const {DynamoDBClient} = require("@aws-sdk/client-dynamodb");
const {DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const { ScanCommand } = require("@aws-sdk/lib-dynamodb");

require("dotenv").config();

const config = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
}

const dynamoDBClient = new DynamoDBClient(config);
const dynamoDBDocClient = DynamoDBDocumentClient.from(dynamoDBClient);
// Testing
async function queryDataTest(){
  const response = await dynamoDBDocClient.send(
    new ScanCommand({
      TableName: "blogs", // Keep in minds there is a 1MB limit, so the data might be cut off
    }));
  console.log(response.Items);
}

module.exports = queryDataTest;