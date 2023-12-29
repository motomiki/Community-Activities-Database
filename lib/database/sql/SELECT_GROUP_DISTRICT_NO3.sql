SELECT
  tg.id,
  tg.logo,
  tg.name,
  tg.label,
  tg.content,
  tg.address,
  tg.img_url_one,
  GROUP_CONCAT(mc.name separator ', ') as categories
FROM
  t_group tg
LEFT JOIN t_group_category tgc ON tg.id = tgc.group_id
LEFT JOIN m_category mc ON tgc.category_id = mc.id
WHERE
  mc.parent_id = 73
GROUP BY tg.id
ORDER BY tg.id DESC
LIMIT ?, ?;