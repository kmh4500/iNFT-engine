
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

function getHistory() {
  return ain.db.ref(CHAT_DB_PATH).getValue()
}

function sendChat(user, message, time) {
  return ain.db.ref(CHAT_DB_PATH + '/' + time).setValue({
    value: {user: user, message: message},
    nonce: -1
  })
}

function getMessage(time) {
  return ain.db.ref(CHAT_DB_PATH + '/' + time).getValue()
}

module.exports = {
  getHistory,
  sendChat,
  getMessage
};
