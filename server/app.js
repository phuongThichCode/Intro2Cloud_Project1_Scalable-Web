const express = require("express");
const path = require("path");

const cors = require("cors");

const app = express();
const postRoute = require("./routes/post-route.js");

require("dotenv").config();

app.use(cors()); 
app.use(express.json());

app.use("/api/posts", postRoute);


app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`));
