const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());


//route
const imageApi = require("./api/image");
app.use("/api/image", imageApi);

// if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
// }

const port = process.env.PORT || 5000;

app.listen(port,()=> console.log(`Server listen at ${port}....`));
