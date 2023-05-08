const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./api/users");
const Branch = require("./api/branches");
const cors = require("cors");

var fs = require("fs");
var https = require("https");
var privateKey = fs.readFileSync("./sslcerts/selfsigned.pkey", "utf8");
var certificate = fs.readFileSync("./sslcerts/selfsigned.cer", "utf8");
var credentials = { key: privateKey, cert: certificate };

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users",User);
app.use("/api/branches",Branch);

var httpsServer = https.createServer(credentials, app);

mongoose
  .connect(
    "mongodb+srv://Josephxrex:OliverAlex5@cluster0.nw2194v.mongodb.net/LeadDogBeerDB?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(
    () => {
      /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
      app.listen(4005, () => {
        console.log("Server running on http://172.18.70.178:4001");
      });

      httpsServer.listen(5176, () => {
        console.log("Server running on https://172.18.70.178:5176");
      });
    },
    (err) => {
      /** handle initial connection error */
      err & console.log(err) & console.log("Error connecting to db");
    }
  );
