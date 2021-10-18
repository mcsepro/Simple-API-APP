const express = require("express");

const app = express()

const imageUpload = require("./imageupload");

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

 

app.use("/users", require("./controller/users"));

 

app.listen(3000, () => console.log('Server started on port 3000'));
