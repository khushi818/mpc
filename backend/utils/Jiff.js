const { JIFFClient } = require('jiff-mpc');

function onConnect() {
    Console.log('All parties connected!');
  }

let options = { party_count: 3, crypto_provider: true, onConnect: onConnect, Zp: 11 };
const jiffClient = new JIFFClient("http://localhost:8080", "voting", options);


module.exports = {
    jiffClient
}