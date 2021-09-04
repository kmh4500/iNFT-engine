/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
var visit = {}
const engine = require("./engine");
const ainClient = require("./ain-client");
export default async function handler(req, res) {
  let message = req.query.transaction || req.body.transaction || 'Hello World!';
  console.log('[transaction]', message)
  ref = message.tx_body.operation.ref
  value = message.tx_body.operation.value
  if (ref && value) {
    if (!visit[ref]) {
      visit[ref] = true
      return ainClient.getResponse(ref).then(async (result) => {
        console.log('[response]', result)
        if (!result) {
          response = await engine.complete(value.message)
          if (response) {
            ainClient.sendResponse(ref, response)
            res.status(200).send(result);
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
