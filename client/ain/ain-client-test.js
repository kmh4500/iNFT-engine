

const ainClient = require("./ain-client");

ainClient.sendChat('test', 'What is going on?').then(function(result) {
  console.log('[sendChat]', result)
  return ainClient.getHistory()
}).then((result) => {
  console.log('[getHistory]', result)
});
