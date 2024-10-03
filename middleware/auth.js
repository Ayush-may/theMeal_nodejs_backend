const jwt = require("jsonwebtoken");

function auth(req, res, next) {
 console.log("this middleware is running");

 try {
  // get the token from request
  const uid = req.cookies?.uid;
  // check if token ( uid ) is avaialble or not
  if (!uid) return res.status(401).send("token is not available");

  // verify the token
  const user = jwt.verify(uid, process.env.JSONKEY);
  if (!user) return res.status(401).send("token is  in-valid");

  // everything is OK
  req.user = user;
  next();
 } catch (error) {
  // in-case something happened
  return res.status(401).send("token is  in-valid");
 }
}

module.exports = { auth };
