require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./routes");

const app = express();

// middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// CORS
const whitelist = [
  "https://inventorsoft.herokuapp.com",
  "http://localhost:8080",
  "https://9452-176-120-106-199.eu.ngrok.io",
  "https://academy.inventorsoft.co"
];
const corsOptions = {
  origin: (origin, callback) => {
    whitelist.indexOf(origin) !== -1
      ? callback(null, true)
      : callback(new Error("Not allowed by CORS"));
  },
};
app.use(cors(corsOptions));

// mount routes
app.use("/firebase", router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${[port]}`));

module.exports = app;
