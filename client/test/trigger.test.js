


const { expect } = require("chai");
import handler from "../pages/api/trigger"
describe("trigger tests", () => {
  after(() => {
  });

  it("test complete", async () => {
    let req = {
      query: {
        transaction: {
          tx_body: {
            operation: {
              ref: 'apps/chat/ainetwork/0xuser/123',
              value: {user: 'minhyun', message: 'What is the greatest novel in the history?'}
            }
          }
        }
      }
    }
    let res = {
      status: function(code) {
        console.log('[status]', code)
        return this;
      },
      send: function send(message) {
        console.log('[send]', message);
        expect(message).not.equal('')
      }
    }
    await handler(req, res)
  }).timeout(10000);


  it("test don't answer my message", async () => {
    let req = {
      query: {
        transaction: {
          tx_body: {
            operation: {
              ref: 'apps/chat/ainetwork/0xuser/123',
              value: {user: 'AIN', message: 'What is the greatest novel in the history?'}
            }
          }
        }
      }
    }
    let res = {
      status: function(code) {
        console.log('[status]', code)
        return this;
      },
      send: function send(message) {
        console.log('[send]', message);
        expect(message).equal('')
      }
    }
    await handler(req, res)
  }).timeout(10000);
});
