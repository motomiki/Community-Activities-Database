SELECT
  group_category.id,
  group_category.logo,
  group_category.name,
  group_category.label,
  group_category.content,
  group_category.img_url_one,
  group_category.address,
  GROUP_CONCAT(m_category.name separator ', ') as categorys
FROM
(
  SELECT
  *

  FROM
  (
    SELECT * FROM t_group ORDER BY id ASC LIMIT ?, ?

  ) as group_table
  LEFT JOIN t_group_category ON group_table.id = t_group_category.group_id
) as group_category
LEFT JOIN m_category ON group_category.category_id = m_category.id
GROUP BY group_category.id
ORDER BY id ASC