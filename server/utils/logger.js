const fs = require('fs');
const logger = (code, message, data, user) => {
  console.log(`Status Code ${code}: ${message}, Data: ${data._id}`, user);
  const date = new Date(Date.now());
  fs.appendFileSync(
    './activity.log',
    `\n${date}:\nStatus Code ${code}, ${message}, DataID: ${data._id}, By User: ${user}`
  );
};
module.exports = logger;
