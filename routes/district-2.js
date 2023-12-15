const router = require("express").Router();
const { MySQLClient, sql} = require("../lib/database/client.js");
const MAX_ITEMS = 5;

router.get("/", async (req, res, next) => {
  var page = req.query.page ? parseInt(req.query.page) : 1;
  var count, results;

  try {
    count = MAX_ITEMS;
    // count = 10;
    results = await MySQLClient.executeQuery (
      await sql("SELECT_GROUP_DISTRICT_NO2"),
      [MAX_ITEMS]
    );

    res.render("./district/list.ejs", {
      count,
      results,
      pagenation: {
        max: Math.ceil(count / MAX_ITEMS),
        current: page
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;