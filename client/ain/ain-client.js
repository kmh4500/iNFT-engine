
const Ain = require('@ainblockchain/ain-js').default;
const ain = new Ain('http://node.ainetwork.ai:8080');
const account = ain.wallet.create(1);
const myAddress = account[0];
const CHAT_DB_PATH = "/apps/chat/ainetwork"
// Set myAddress as the default account
ain.wallet.setDefaultAccount(myAddress);
console.log(myAddress)

// Print defaultAccount (Need to backup your private key)
console.log(ain.wallet.defaultAccount);

function getHistory(user) {
  return ain.db.ref(CHAT_DB_PATH + '/' + user).getValue()
}

function sendChat(user, message, time) {
  return ain.db.ref(CHAT_DB_PATH + '/' + user + '/' + time).setValue({
    value: {message: message},
    nonce: -1
  })
}

function getMessage(user, time) {
  return ain.db.ref(CHAT_DB_PATH + '/' + user + '/' + time).getValue()
}


function sendResponse(ref, message) {
  return ain.db.ref(ref + '/response').setValue({
    value: message,
    nonce: -1,
  })
}

function getResponse(ref) {
  return ain.db.ref(ref + '/response').getValue()
}

module.exports = {
  getHistory,
  sendChat,
  getMessage,
  sendResponse,
  getResponse
};
