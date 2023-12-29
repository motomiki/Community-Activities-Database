const MAX_ITEMS_PER_PAGE = require("../config/application.config.js").search.MAX_ITEMS_PER_PAGE;
const router = require("express").Router();
const { MySQLClient, sql} = require("../lib/database/client.js");

router.get("/", async (req, res, next) => {
  var page = req.query.page ? parseInt(req.query.page) : 1;
  var count, results;

  try {
    // 総結果数を取得
    const totalCount = await MySQLClient.executeQuery(
      await sql("SELECT_COUNT_DISTRICT_NO6")
    );
    count = totalCount[0].count;

    // 結果をページに合わせて取得
    results = await MySQLClient.executeQuery(
      await sql("SELECT_GROUP_DISTRICT_NO6"),
      [
        (page - 1) * MAX_ITEMS_PER_PAGE,
        MAX_ITEMS_PER_PAGE
      ]
    );

    res.render("./district/list-6.ejs", {
      count,
      results,
      pagenation: {
        max: Math.ceil(count / MAX_ITEMS_PER_PAGE),
        current: page
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;