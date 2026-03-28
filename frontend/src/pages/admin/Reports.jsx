import { useState, useEffect, forwardRef } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { fetchReports } from "../../services/dashboard";

const COLORS = ["#F59E0B", "#EF4444", "#6366F1", "#10B981"];
const STATUS = ["Pending", "Open", "Closed", "Resolved"];

const DateInput = forwardRef(({ value, onClick }, ref) => (
  <button onClick={onClick} ref={ref} className="flex items-center gap-2 border px-3 py-2 rounded text-sm">
    <Calendar size={16} />
    <span>{value || "Select date range"}</span>
  </button>
));

export default function Reports() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [overTime, setOverTime] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [urgency, setUrgency] = useState([]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchReports({
          startDate: startDate?.toISOString().slice(0, 10),
          endDate: endDate?.toISOString().slice(0, 10),
        });
        
       setOverTime(
  res.overTime?.map(item => ({
    ...item,
    
    date: new Date(item.Date).toLocaleDateString("en-CA", { timeZone: "Africa/Addis_Ababa" })
  })) || []
);

        setByCategory(res.byCategory || []);
        setUrgency(res.urgency || []);
      } catch {
        console.error("Reports load failed");
      }
    })();
  }, [startDate, endDate]);

  const renderLegend = (items) => (
    <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
          {item}
        </div>
      ))}
    </div>
  );

  const downloadReport = () => {
   const today = new Date().toLocaleDateString("en-CA");
    const format = (d) => d ? d.toISOString().slice(0, 10) : "All";

    const csvRows = [
      ["Report Name", "Complaints Report"],
      ["Generated Date", today],
      ["Filter From", format(startDate)],
      ["Filter To", format(endDate)],
      [],
      ["Complaints Over Time"],
      ["Date", ...STATUS],
      ...overTime.map(i => [i.date, i.pending || 0, i.open || 0, i.closed || 0, i.resolved || 0]),
      [],
      ["Complaints By Category"],
      ["Category", "Count"],
      ...byCategory.map(i => [i.name || "", i.value || 0]),
      [],
      ["Urgency Distribution"],
      ["Urgency Level", "Count"],
      ...urgency.map(i => [i.name || "", i.value || 0]),
    ];

    const blob = new Blob([csvRows.map(r => r.join(",")).join("\n")], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `complaints_report_${today}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Visual Reports</h1>

      <div className="flex flex-wrap justify-center mb-6 gap-4 items-center">
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={setDateRange}
          customInput={<DateInput />}
        />
        <Button onClick={downloadReport}>Download Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        <Card title="Complaints Over Time">
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <LineChart data={overTime}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                {["pending", "open", "closed", "resolved"].map((key, i) => (
                  <Line key={key} type="monotone" dataKey={key} stroke={COLORS[i]} strokeWidth={2} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          {renderLegend(STATUS)}
        </Card>

        
        <Card title="Complaints by Category">
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <BarChart data={byCategory}>
                <XAxis dataKey="name" interval="preserveStartEnd" angle={-30} textAnchor="end" height={70} tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {byCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {renderLegend(byCategory.map(c => c.name))}
        </Card>
      </div>

     
      <Card title="Urgency Distribution">
        <div className="flex flex-col items-center">
          <div className="h-64 w-full max-w-xs">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={urgency} dataKey="value" innerRadius={60} outerRadius={90}>
                  {urgency.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {renderLegend(urgency.map(u => u.name))}
        </div>
      </Card>
    </>
  );
}
