import { useEffect, useState } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Card from "../../components/common/Card";
import { fetchDashboard } from "../../services/dashboard";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#6366F1" ];

function Dashboard() {
  const [stats, setStats] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [urgencyData, setUrgencyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard()
      .then(res => {
        const d = res.data;
        setStats([
          { title: "Total Complaints", value: d.stats.total },
          { title: "Resolved Today", value: d.stats.resolvedToday },
          { title: "Resolved Complaints", value: d.stats.resolved },
          { title: "Avg Response Time", value: `${d.stats.avgMinutes} min` },
        ]);
        setCategoryData(d.categories || []);
        setUrgencyData(d.urgency || []);
      })
      .catch(() => console.error("Dashboard load failed"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

     
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map(s => (
          <Card key={s.title}>
            <div className="text-sm text-gray-500 mb-1">{s.title}</div>
            <div className="text-3xl font-bold">{s.value}</div>
          </Card>
        ))}
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
        <Card title="Complaints by Category">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="name" interval={0} angle={-20} textAnchor="end" height={70} tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Urgency Distribution">
          <div className="flex flex-col items-center w-full">
            <div className="h-64 w-full max-w-xs">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={urgencyData} dataKey="value" innerRadius={60} outerRadius={90}>
                    {urgencyData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
              {urgencyData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Dashboard;
