
const ainClient = require("../../ain/ain-client");


export default async function handler(req, res) {
  let result = await ainClient.getMessage(req.query.time);
  console.log(result)
  res.status(200).json(result)
}