const MAX_ITEMS_PER_PAGE = require("../config/application.config.js").search.MAX_ITEMS_PER_PAGE;
const router = require("express").Router();
const { MySQLClient, sql } = require("../lib/database/client.js");

router.get("/", async(req, res, next) => {
  var page = req.query.page ? parseInt(req.query.page) : 1;
  var keyword = req.query.keyword || "";
  var count, results;

  try {
    if(keyword) {
      const searchParams = Array(7).fill(`%${keyword}%`); // 7つのカラム分のパラメータを作成

      count = (await MySQLClient.executeQuery (
        await sql("COUNT_GROUP_BY_NAME"),
        searchParams
      ))[0].count;

      results = await MySQLClient.executeQuery(
        await sql("SELECT_GROUP_LIST_BY_NAME"),
        [
          `%${keyword}%`,
          `%${keyword}%`,
          `%${keyword}%`,
          `%${keyword}%`,
          `%${keyword}%`,
          `%${keyword}%`,
          `%${keyword}%`,
          (page - 1) * MAX_ITEMS_PER_PAGE,
          MAX_ITEMS_PER_PAGE
        ]
      );

    } else {
      const totalResult = await MySQLClient.executeQuery(
        await sql("SELECT_COUNT_ALL_GROUPS")
      );
      count = totalResult[0].count;

      const offset = (page - 1) * MAX_ITEMS_PER_PAGE;

      results = await MySQLClient.executeQuery (
        await sql("SELECT_GROUP_NUMBER_LIST"),
        [offset, MAX_ITEMS_PER_PAGE]
      );
    }

      res.render("./search/list.ejs", {
        keyword,
        count,
        results,
        pagenation: {
          max: Math.ceil(count / MAX_ITEMS_PER_PAGE),
          current: page
        }
      });
    } catch(err) {
      next(err);
  }
});

module.exports = router;