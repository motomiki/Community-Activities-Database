const fs = require('fs');

module.exports = {
  HOST: process.env.MYSQL_HOST || "127.0.0.1",
  USER: process.env.MYSQL_USERNAME || "admin",
  PASSWORD: process.env.MYSQL_PASSWORD || "admin5206",
  DATABASE: process.env.MYSQL_DATABASE || "localgroup",
  PORT: process.env.MYSQL_PORT || "3306",
  SSL: process.env.MYSQL_SSL_CA ?
    { ca: fs.readFileSync(process.env.MYSQL_SSL_CA) } : null,
  CONNECTION_LIMIT: process.env.MYSQL_CONNECTION_LIMIT ?
    parseInt(process.env.MYSQL_CONNECTION_LIMIT) : 10,
  QUEUE_LIMIT: process.env.MYSQL_QUEUE_LIMIT ?
    parseInt(process.env.MYSQL_QUEUE_LIMIT) : 0
};


// module.exports = {
//   HOST: process.env.MYSQL_HOST || "127.0.0.1",
//   PORT: process.env.MYSQL_PORT || "3306",
//   USERNAME: process.env.MYSQL_USERNAME || "admin",
//   PASSWORD: process.env.MYSQL_PASSWORD || "admin5206",
//   DATABASE: process.env.MYSQL_DATABASE || "localgroup",
//   CONNECTION_LIMIT: process.env.MYSQL_CONNECTION_LIMIT ?
//     parseInt(process.env.MYSQL_CONNECTION_LIMIT) : 10,
//   QUEUE_LIMIT: process.env.MYSQL_QUEUE_LIMIT ?
//     parseInt(process.env.MYSQL_QUEUE_LIMIT) : 0
// };