require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/api/v1/users", userRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on PORT: ${process.env.PORT}`));