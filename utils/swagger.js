const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Recently Viewed Products API",
      version: "1.0.0",
      description: "API documentation for Recently Viewed Products",
    },
  },
  apis: ["./routes/*.js"],  // Path to your API routes (adjust as per your project structure)
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = setupSwagger;
