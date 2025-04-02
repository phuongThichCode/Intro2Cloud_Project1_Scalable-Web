const { ScanCommand, GetCommand, UpdateCommand, PutCommand, DeleteCommand} = require("@aws-sdk/lib-dynamodb");
const dynamoDBDocClient = require("../config/db.js");
const { v4: uuidv4 } = require("uuid");

async function getAllPosts(req, res){
  try{
    const result = await dynamoDBDocClient.send(
      new ScanCommand({
        TableName: "blogs"
      })
    );
    res.status(200).json({ok: false, data: result.Items, error: ""});
    
  } catch(err){
    console.error("Error get all posts: ", err.message || err);
    res.status(500).json({ok: false, data: null, error: err.message || err});
  }
}

async function searchPosts(req, res){
  console.log("searchPosts called");

  try{
    const query = req.query;
    const searchTerm = query.value || "";
    console.log("Search query: ", searchTerm);
    if (!searchTerm || searchTerm.length === 0){
      return getAllPosts(req, res);
    }

    const result = await dynamoDBDocClient.send(
      new ScanCommand({
        TableName: "blogs",
        FilterExpression: "contains(title, :searchTerm) OR contains(content, :searchTerm)",
        ExpressionAttributeValues: {
          ":searchTerm": searchTerm
        },
      })
    );
    res.status(200).json({ok: false, data: result.Items, error: ""});
    
  } catch(err){
    console.error("Error get all posts: ", err.message || err);
    res.status(500).json({ok: false, data: null, error: err.message || err});
  }
}

async function getPost(req, res) {
  try{
    if (!('id' in req.params) || !req.params.id){
      throw Error("Missing parameter: id");
    }
    const post_id = req.params.id;
    
    const result = await dynamoDBDocClient.send(
      new GetCommand({
        TableName: "blogs",
        Key: {post_id: post_id}
      })
    );
    if (!result && result.Count < 1){
      throw Error(`Couldn't find any blog with post_id ${post_id}`);
    }
    res.status(200).json({ok: false, data: result.Item, error: ""});
    
  } catch(err){
    console.error("Error getting post: ", err.message || err);
    res.status(500).json({ok: false, data: null, error: err.message || err});
  }
}

async function updatePost(req, res){
  try {
    if (!('id' in req.params) || !req.params.id) {
      throw Error("Missing parameter: id");
    }
    const post_id = req.params.id;
    const { title, content } = req.body;
    const currentDate = new Date().toISOString();

    if (!title && !content) {
      throw Error("Missing fields to update: title or content");
    }

    const updateExpression = [];
    const expressionAttributeValues = {};

    if (title) {
      updateExpression.push("title = :title");
      expressionAttributeValues[":title"] = title;
    }

    if (content) {
      updateExpression.push("content = :content");
      expressionAttributeValues[":content"] = content;
    }

    updateExpression.push("updated_date = :updated_date");
    expressionAttributeValues[":updated_date"] = currentDate;

    const result = await dynamoDBDocClient.send(
      new UpdateCommand({
        TableName: "blogs",
        Key: { post_id: post_id },
        UpdateExpression: `SET ${updateExpression.join(", ")}`,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "UPDATED_NEW"
      })
    );

    if (result && result.Attributes.length > 0){
      throw Error("No blog posts was updated");
    }

    res.status(200).json({ ok: true, data: result.Attributes, error: "" });
  } catch (err) {
    console.error("Error updating post: ", err.message || err);
    res.status(500).json({ ok: false, data: null, error: err.message || err });
  }
}

async function addPost(req, res){
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      throw Error("Missing required fields: title and content");
    }

    const post_id = uuidv4();
    const currentDate = new Date().toISOString();

    const newPost = {
      post_id,
      title,
      content,
      published_date: currentDate,
      updated_date: currentDate,
    };

    await dynamoDBDocClient.send(
      new PutCommand({
        TableName: "blogs",
        Item: newPost,
      })
    );

    res.status(201).json({ ok: true, data: newPost, error: "" });
  } catch (err) {
    console.error("Error adding post: ", err.message || err);
    res.status(500).json({ ok: false, data: null, error: err.message || err });
  }
}

async function deletePost(req, res){
  try {
    if (!('id' in req.params) || !req.params.id) {
      throw Error("Missing parameter: id");
    }
    const post_id = req.params.id;

    const result = await dynamoDBDocClient.send(
      new DeleteCommand({
        TableName: "blogs",
        Key: { post_id: post_id },
        ReturnValues: "ALL_OLD"
      })
    );

    if (!result.Attributes) {
      throw Error(`No blog post found with post_id ${post_id}`);
    }

    res.status(200).json({ ok: true, data: result.Attributes, error: "" });
  } catch (err) {
    console.error("Error deleting post: ", err.message || err);
    res.status(500).json({ ok: false, data: null, error: err.message || err });
  }
}

module.exports = {
  getAllPosts,
  searchPosts,
  getPost,
  updatePost,
  addPost,
  deletePost
}