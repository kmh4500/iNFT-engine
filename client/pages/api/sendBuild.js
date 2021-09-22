
const ainClient = require("../../ain/ain-client");


export default async function handler(req, res) {
  console.log(req.body.data);
  console.log(req.body.name);
  let result = await ainClient.sendBuild(
    req.body.name,
    req.body.data);
  console.log(result)
  res.status(200).json(result)
}
