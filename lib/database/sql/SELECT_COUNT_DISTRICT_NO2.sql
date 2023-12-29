SELECT
  COUNT(*) as count
FROM
  t_group tg
LEFT JOIN t_group_category tgc ON tg.id = tgc.group_id
LEFT JOIN m_category mc ON tgc.category_id = mc.id
WHERE
  mc.parent_id = 31;