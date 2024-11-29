require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const setupSwagger = require("./utils/swagger");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use("/api/v1/users", userRoutes);
setupSwagger(app);
app.listen(process.env.PORT, () => console.log(`Server running on PORT: ${process.env.PORT}`));