const { promisify } = require("util");
const config = require("../../config/mysql.config.js");
const sql = require("mssql");

const pool = new sql.ConnectionPool({
  server: config.HOST,
  port: config.PORT,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE,
  options: config.OPTIONS,
  pool: {
    max: config.CONNECTION_LIMIT,
    min: 0,
    idleTimeoutMillis: 30000
  }
});

const poolConnect = pool.connect();

module.exports = {
  pool,
  getConnection: async () => {
    await poolConnect; // プールが接続されるのを待つ
    return pool.request(); // 新しいリクエストを作成
  },
  executeQuery: async (query, parameters = []) => {
    await poolConnect;
    const request = pool.request();
    parameters.forEach(param => {
      request.input(param.name, param.type, param.value);
    });
    return request.query(query);
  },
  releaseConnection: () => {
    // MSSQL プールは自動的にコネクションを管理するので、この関数は不要
  },
  end: async () => {
    await pool.close();
  }
};


// const { promisify } = require("util");
// const config = require("../../config/mysql.config.js");
// const mysql = require("mysql");
// const pool = mysql.createPool({
//   host: config.HOST,
//   port: config.PORT,
//   user: config.USERNAME,
//   password: config.PASSWORD,
//   database: config.DATABASE,
//   connectionLimit:  config.CONNECTION_LIMIT,
//   queueLimit: config.QUEUE_LIMIT
// });
// module.exports = {
//   pool,
//   getConnection: promisify(pool.getConnection).bind(pool),
//   executeQuery: promisify(pool.query).bind(pool),
//   releaseConnection: function(connection) {
//     connection.release();
//   },
//   end: promisify(pool.end).bind(pool)
// };