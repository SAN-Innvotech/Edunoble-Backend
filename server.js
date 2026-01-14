const http = require("http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// loading process variables declared in .env file
require("dotenv").config();

const app = express();
const httpServer = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Using Routes
app.use("/apis", require("./src/api/api.router"));

// setting swagger

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8001",
      },
      {
        url: "https://edunoble-backend.vercel.app"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: [
    "./src/api/auth/auth.router.js",
    "./src/api/papers/paper.router.js",
    "./src/api/contact/contact.router.js",
    "./src/api/testimonials/testimonial.router.js",
    "./src/api/contentPages/contentPage.router.js",
  ],
};

const specs = swaggerJsDoc(options);

// Swagger UI setup with proper configuration for production
const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "EduNoble API Documentation",
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    tryItOutEnabled: true,
    docExpansion: "list",
    filter: true,
    showRequestHeaders: true,
  },
};

app.use("/apis/api-docs", swaggerUI.serve, swaggerUI.setup(specs, swaggerUiOptions));

//default route
app.use("/", (req, res, next) => {
  res.send("welcome to EduNoble apis!");
});

//if something wrong with the server
app.use((req, res, next) => {
  res.status(500).json({
    message: "Something went wrong",
  });
});

const port = process.env.PORT || 8001;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("MongoDB connected!!!");
  httpServer.listen(port, () => {
    console.log("serving!!!");
  });
});
