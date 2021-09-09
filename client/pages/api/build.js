const axios = require('axios');

export default async function handler(req, res) {
  let channel = req.body.channel;
  let data = req.body.data;
  console.log(channel);
  console.log(data);
  let result = await axios.post(`http://localhost:5000/build/${channel}`, { data: data})
  console.log(result.data)
  res.status(200).send(result.data)
}
