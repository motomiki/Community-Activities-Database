const { promisify } = require("util");
const config = require("../../config/mysql.config.js");
const mysql = require("mysql");
<<<<<<< HEAD

=======
>>>>>>> 5b9e419050105f1039e90cb68a609408a659113f
const pool = mysql.createPool({
  host: config.HOST,
  port: config.PORT,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE,
  connectionLimit:  config.CONNECTION_LIMIT,
<<<<<<< HEAD
  queueLimit: config.QUEUE_LIMIT,
  ssl: config.SSL
});

=======
  queueLimit: config.QUEUE_LIMIT
});
>>>>>>> 5b9e419050105f1039e90cb68a609408a659113f
module.exports = {
  pool,
  getConnection: promisify(pool.getConnection).bind(pool),
  executeQuery: promisify(pool.query).bind(pool),
  releaseConnection: function(connection) {
    connection.release();
  },
  end: promisify(pool.end).bind(pool)
};