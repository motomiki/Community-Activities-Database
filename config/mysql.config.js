const dotenv = require('dotenv');
dotenv.config({ path: `.env.${process.env.NODE_ENV}`, debug: true });

module.exports = {
  HOST: process.env.AZURE_SQL_SERVER || "your_server.database.windows.net",
  PORT: parseInt(process.env.AZURE_SQL_PORT) || 1433,
  USERNAME: process.env.AZURE_SQL_USER || "your_username",
  PASSWORD: process.env.AZURE_SQL_PASSWORD || "your_password",
  DATABASE: process.env.AZURE_SQL_DATABASE || "your_database",
  CONNECTION_LIMIT: process.env.AZURE_SQL_CONNECTION_LIMIT ?
    parseInt(process.env.AZURE_SQL_CONNECTION_LIMIT) : 10,
  QUEUE_LIMIT: process.env.AZURE_SQL_QUEUE_LIMIT ?
    parseInt(process.env.AZURE_SQL_QUEUE_LIMIT) : 0,
  OPTIONS: {
    encrypt: true,
    trustServerCertificate: false // 本番環境ではfalseに設定
  }
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