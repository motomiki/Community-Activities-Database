// const fs = require('fs');

// module.exports = {
//   HOST: process.env.MYSQL_HOST,
//   PORT: process.env.MYSQL_PORT,
//   USERNAME: process.env.MYSQL_USERNAME,
//   PASSWORD: process.env.MYSQL_PASSWORD,
//   DATABASE: process.env.MYSQL_DATABASE,
//   CONNECTION_LIMIT: process.env.MYSQL_CONNECTION_LIMIT ?
//     parseInt(process.env.MYSQL_CONNECTION_LIMIT) : 10,
//   QUEUE_LIMIT: process.env.MYSQL_QUEUE_LIMIT ?
//     parseInt(process.env.MYSQL_QUEUE_LIMIT) : 0,
//   SSL: {
//     ca: fs.readFileSync(process.env.MYSQL_SSL_CA || 'path_to_your_ssl_certificate')
//   }
// };


const fs = require('fs');

function loadSSLCAFile(filePath) {
  try {
    // fs.readFileSyncを試みる
    return fs.readFileSync(filePath);
  } catch (error) {
    // ファイルが読み込めない場合のエラーを捕捉
    console.error(`SSL CAファイルの読み込みに失敗しました: ${error.message}`);
    // エラーが発生した場合、nullやデフォルト値を返すなどの処理を行う
    return null; // または、適切なデフォルトのCA証明書の内容を返す
  }
}

module.exports = {
  HOST: process.env.MYSQL_HOST,
  PORT: process.env.MYSQL_PORT,
  USERNAME: process.env.MYSQL_USERNAME,
  PASSWORD: process.env.MYSQL_PASSWORD,
  DATABASE: process.env.MYSQL_DATABASE,
  CONNECTION_LIMIT: process.env.MYSQL_CONNECTION_LIMIT ?
    parseInt(process.env.MYSQL_CONNECTION_LIMIT) : 10,
  QUEUE_LIMIT: process.env.MYSQL_QUEUE_LIMIT ?
    parseInt(process.env.MYSQL_QUEUE_LIMIT) : 0,
  SSL: {
    // SSL CAファイルの読み込み処理を関数でラップ
    ca: loadSSLCAFile(process.env.MYSQL_SSL_CA || 'path_to_your_ssl_certificate')
  }
};