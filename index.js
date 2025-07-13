const app = require("./app");
const serverless = require("serverless-http");
// module.exports = serverless(app);
module.exports = (req, res) => {
  res.json({ message: "Hello from Vercel!" });
};