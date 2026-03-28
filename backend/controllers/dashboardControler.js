
import db from "../config/db.js";

export const getDashboardData = async (req, res) => {
  try {
    const [[total]] = await db.query(
      "SELECT COUNT(*) as total FROM complaints"
    );

    const [[resolvedToday]] = await db.query(`
      SELECT COUNT(*) as count
      FROM complaints
      WHERE status='resolved' AND DATE(resolved_at)=CURDATE()
    `);
    const [[resolved]] = await db.query(`
      SELECT COUNT(*) as count
      FROM complaints
      WHERE status='resolved'
    `);

    
    const [[avgTime]] = await db.query(`
      SELECT AVG(TIMESTAMPDIFF(MINUTE, created_at, resolved_at)) as avg
      FROM complaints
      WHERE status='resolved' AND resolved_at IS NOT NULL
    `);

    const [categories] = await db.query(`
      SELECT category as name, COUNT(*) as value
      FROM ai_analysis
      GROUP BY category
    `);

    const [urgency] = await db.query(`
      SELECT urgency as name, COUNT(*) as value
      FROM ai_analysis
      GROUP BY urgency
    `);

    res.json({
      stats: {
        total: total.total,
        resolvedToday: resolvedToday.count,
        resolved: resolved.count,
        avgMinutes: Math.round(avgTime.avg || 0),
      },
      categories,
      urgency,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ msg: "Dashboard load failed" });
  }
};
