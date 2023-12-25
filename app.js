const IS_PRODUCTION = process.env.NODE_ENV === "production";
const appconfig = require("./config/application.config.js");
const mysql = require('mysql2');
const dbconfig = require("./config/mysql.config.js");
const path = require("path");
const logger = require("./lib/log/logger.js");
const accesslogger = require("./lib/log/accesslogger.js");
const applicationlogger = require("./lib/log/applicationlogger.js");
const express = require("express");
const favicon = require("serve-favicon");
const cookie = require("cookie-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const flash = require("connect-flash");
const gracefulShutdown = require("http-graceful-shutdown");
const app = express();

// Express settings
app.set("view engine", "ejs");
app.disable("x-powered-by");

// Expose global method to view engine
app.use((req, res, next) => {
  res.locals.moment = require("moment");
  res.locals.padding = require("./lib/math/math.js").padding;
  next();
});

// Static resource rooting
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "/public")));

// Set access log
app.use(accesslogger());

// データベース接続のテスト
const testConnection = () => {
  const testConn = mysql.createConnection({
    host: dbconfig.HOST,
    user: dbconfig.USERNAME,
    password: dbconfig.PASSWORD,
    database: dbconfig.DATABASE,
    port: dbconfig.PORT,
    ssl: dbconfig.SSL
  });

  testConn.connect(err => {
    if (err) {
      console.error('データベース接続エラー: ', err);
    } else {
      console.log('データベースに接続されました');
    }
    testConn.end();
  });
};

testConnection();

// Set middleware
app.use(cookie());
app.use(session({
  store: new MySQLStore({
    host: dbconfig.HOST,
    user: dbconfig.USERNAME,
    password: dbconfig.PASSWORD,
    database: dbconfig.DATABASE,
    port: dbconfig.PORT,
    ssl: dbconfig.SSL
  }),
  cookie: {
    secure: IS_PRODUCTION
  },
  secret: appconfig.security.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: "sid"
}));
app.use(express.urlencoded({ extended: true }));
app.use(flash());

// Dynamic resource rooting
app.use("/", (() => {
  const router = express.Router();
  router.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    next();
  });
  router.use("/district-1", require("./routes/district-1.js"));
  router.use("/district-2", require("./routes/district-2.js"));
  router.use("/district-3", require("./routes/district-3.js"));
  router.use("/district-4", require("./routes/district-4.js"));
  router.use("/district-5", require("./routes/district-5.js"));
  router.use("/district-6", require("./routes/district-6.js"));
  router.use("/district-7", require("./routes/district-7.js"));
  router.use("/search", require("./routes/search.js"));
  router.use("/groups", require("./routes/groups.js"));
  router.use("/test", (req, res) => {throw new Error("test error"); });
  router.use("/", require("./routes/index.js"));
  return router;
})());

// Set application log
app.use(applicationlogger());

// Custom Error page
app.use((req, res, next) => {
  res.status(404);
  res.render("./404.ejs");
});
app.use((err, req, res, next) => {
  res.status(500);
  res.render("./500.ejs");
});

// Execute web application
var server = app.listen(appconfig.PORT, () => {
  logger.application.info(`Application listening at ${appconfig.PORT}`);
});

// Graceful shutdown
gracefulShutdown(server, {
  signals: "SIGINT SIGTERM",
  timeout: 10000,
  onShutdown: () => {
    return new Promise((resolve, reject) => {
      const { pool } = require("./lib/database/pool.js");
      pool.end((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  },
  finally: () => {
    const logger = require("./lib/log/logger.js").application;
    logger.info("Application shutdown finished");
  }
});