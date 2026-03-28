import db from "../config/db.js";

export const getReportsData = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;

    const filters = [];
    const params = [];

    const tzConvertedDate = "DATE(CONVERT_TZ(created_at, '+00:00', '+03:00'))";

    if (startDate && endDate) {
      filters.push(`${tzConvertedDate} BETWEEN ? AND ?`);
      params.push(startDate, endDate);
    }

    if (category && category !== "All") {
      filters.push("category = ?");
      params.push(category);
    }

    const whereClause = filters.length > 0 ? "WHERE " + filters.join(" AND ") : "";

    const [overTime] = await db.query(`
      SELECT ${tzConvertedDate} as Date,
             SUM(status='pending') as pending,
             SUM(status='open') as open,
             SUM(status='closed') as closed,
             SUM(status='resolved') as resolved
      FROM complaints
      ${whereClause}
      GROUP BY ${tzConvertedDate}
      ORDER BY ${tzConvertedDate}
    `, params);

    const [byCategory] = await db.query(`
      SELECT category as name, COUNT(*) as value
      FROM ai_analysis
      ${startDate && endDate ? `WHERE DATE(CONVERT_TZ(created_at, '+00:00', '+03:00')) BETWEEN ? AND ?` : ""}
      GROUP BY category
    `, startDate && endDate ? [startDate, endDate] : []);

    const [urgency] = await db.query(`
      SELECT urgency as name, COUNT(*) as value
      FROM ai_analysis
      ${startDate && endDate ? `WHERE DATE(CONVERT_TZ(created_at, '+00:00', '+03:00')) BETWEEN ? AND ?` : ""}
      GROUP BY urgency
    `, startDate && endDate ? [startDate, endDate] : []);

    res.json({ overTime, byCategory, urgency });
  } catch (err) {
    console.error("Reports Error:", err);
    res.status(500).json({ msg: "Failed to load reports" });
  }
};
