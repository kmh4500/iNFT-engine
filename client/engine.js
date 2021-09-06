
const axios = require('axios');

exports.complete = (channel, context, text) => {
  return axios.get(`http://localhost:5000/chat?channel=${channel}&context=${context}&message=${text}`)
}
