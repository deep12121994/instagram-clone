const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const { MONGOURI } = require("./config/key");

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo yehh");
});
mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
});

require("./models/userModel");
require("./models/postModel");

app.use(cors());
app.use(express.json()); // for read the json data
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Credential", "true");
  app.send("API is running");
});

// if (process.env.NODE_ENV == "production") {
//   //   app.use(express.static("client/build"));
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
