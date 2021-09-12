/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
var visit = {}
var context_dict = {}
const engine = require("../../engine");
const ainClient = require("../../ain/ain-client");

export default async function handler(req, res) {
  let message = req.query.transaction || req.body.transaction || 'Hello World!';
  console.log('[transaction]', message)
  let ref = message.tx_body.operation.ref
  let value = message.tx_body.operation.value
  console.log('[ref]', ref)
  console.log('[value]', value)
  if (ref && value && !value.response) {
    if (!visit[ref]) {
      visit[ref] = true

      // channel/user/timestamp
      let path = ref.split('/');
      let user = path[path.length - 2];
      let channel = path[path.length - 3];
      const context_key = `${channel}/${user}`
      let context = context_dict[context_key] || ''

      return ainClient.getResponse(ref).then(async (result) => {
        console.log('[previous response]', result)
        if (!result) {
          let response = await engine.complete(channel, context, value.message)
          console.log('[ref]', ref)
          console.log('[response]', response.data)
          if (response && response.data) {
            ainClient.sendResponse(ref, response.data)
            context += 'User:' + value.message + '\n'
            context += `${channel}: ${response}\n`
            context_dict[context_key] = context
            res.status(200).send(response.data);
          } else {
            res.status(404).send('no response from engine');
          }
        } else {
          res.status(200).send('');
        }
      })
    }
  } else {
    res.status(200).send('');
  }
};
