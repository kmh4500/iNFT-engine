const axios = require('axios');

export default async function handler(req, res) {
  let channel = req.query.channel;
  let context = req.query.context;
  let message = req.query.message;
  console.log(channel);
  console.log(context);
  console.log(message);
  let result = await axios(`http://localhost:5000/build?channel=${channel}&context=${context}&message=${message}`)
  console.log(result.data)
  res.status(200).send(result.data)
}
