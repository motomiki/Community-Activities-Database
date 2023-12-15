SELECT
  count(*) as count
FROM
  t_group
WHERE
  name LIKE ?
  OR explanation LIKE ?
  OR content LIKE ?
  OR address LIKE ?
  OR activity_day LIKE ?
  OR age LIKE ?
  OR conditions LIKE ?
