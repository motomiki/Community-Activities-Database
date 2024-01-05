SELECT
  group_category.id,
  group_category.logo,
  group_category.name,
  group_category.label,
  group_category.explanation,
  group_category.content,
  group_category.img_url_one,
  group_category.img_url_two,
  group_category.goolge_map,
  group_category.address,
  group_category.activity_day,
  group_category.age,
  group_category.conditions,
  group_category.url,
  group_category.social_media,
  group_category.email,
  group_category.tel,
	group_category.created,
  group_category.volunteer,
	group_category.v_url,
  group_category.donation,
	group_category.d_url,
	group_category.title_name,
	group_category.description,
  GROUP_CONCAT(m_category.name separator ', ') as categories
FROM
(
  SELECT
    *
  FROM
    (
      SELECT * FROM t_group WHERE id = ?
    ) as group_table
  LEFT JOIN t_group_category ON group_table.id = t_group_category.group_id
) as group_category
LEFT JOIN m_category ON group_category.category_id = m_category.id
GROUP BY group_category.id;
