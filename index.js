// require and initialize dependencies
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
// const libraryRoutes = require("./routes/library-routes");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
const connect = require("./db/connect");
//error handler and not found handler
app.use(notFound);
app.use(errorHandler);
//port
const port = process.env.PORT || 8080;

// database connector function
const start = async () => {
   try {
      await connect(process.env.MONGO_URI);
      app.listen(port, () => {
         console.log(`app is listening on port ${port}`);
      });
   } catch (error) {
      console.log(error);
   }
};
start();
