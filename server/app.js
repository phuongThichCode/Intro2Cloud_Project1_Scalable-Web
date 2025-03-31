const express = require("express");
const path = require("path");

const cors = require("cors");

const app = express();
const indexRoute = require("./routes/index-route.js");

require("dotenv").config();

app.use(cors()); 
app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/posts", indexRoute); // API route


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
