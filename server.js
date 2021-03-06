const express = require("express");
const bodyParser = require("body-parser");
const server = express();

const user = require("./modules/user");
const auth = require("./modules/auth");
const authenticator = require("./modules/auth");
const port = (process.env.PORT || 8080);

server.set("port", port);
server.use(express.static("public"));
server.use(bodyParser.json());

server.get("/test", (req,res,next)=>{

  res.status(200).send("Hello World").end();

});

//når clientet fetcher /user kommer man hit
server.post("/user", async function (req, res){
  const newUser = new user(req.body.username, req.body.password);
  await newUser.create();
  console.log(newUser)
  res.status(200).json(newUser).end();
  //console.log(req.body.username + ":" + req.body.password);
});

server.get("/user", async function (req, res){
  const checkUser = await authenticator(req);
  //console.log(checkUser);
  //await checkUser.login();

});

server.get('/user', async function (req , res){
  let sql = 'SELECT * FROM users';
  try {
    let result = await client.query(sql);
    res.status(200).json(results.rows);
  }
  catch(err) {
    res.status(500).json({error: err});
  }


});

server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});