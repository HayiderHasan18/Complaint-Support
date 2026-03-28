import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import useComplaints from "../../hooks/useComplaints";

const FILTER_OPTIONS = {
  urgencies: ["All Urgencies","critical","high", "medium", "low"],
  statuses: ["All Statuses", "open", "pending", "resolved", "closed"],
  categories: ["All Categories", "Product Issues", "Billing ", "Delivery", "Customer Service", "General"],
};

function Complaints() {
  const { complaints, loading, fetchComplaints } = useComplaints();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [urgency, setUrgency] = useState("All Urgencies");
  const [status, setStatus] = useState("All Statuses");
  const [category, setCategory] = useState("All Categories");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => { fetchComplaints(); }, []);
  useEffect(() => { setFiltered(complaints); }, [complaints]);

  const applyFilters = () => {
    let data = complaints;

    if (search)
      data = data.filter(c =>
        c.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
        String(c.id).includes(search)
      );

    if (urgency !== "All Urgencies")
      data = data.filter(c => c.urgency === urgency);

    if (status !== "All Statuses")
      data = data.filter(c => c.status === status);

    if (category !== "All Categories")
      data = data.filter(c => c.category === category);

    setFiltered(data);
  };

  const clearFilters = () => {
    setSearch("");
    setUrgency("All Urgencies");
    setStatus("All Statuses");
    setCategory("All Categories");
    setFiltered(complaints);
  };

  return (
    <div className="dark:text-gray-200 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Complaints List</h1>

      <Card title="Filter Complaints" className="dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-wrap gap-4 items-end">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-xl px-4 py-2.5 text-sm"
            placeholder="Search by customer or ID..."
          />

          <select value={urgency} onChange={e => setUrgency(e.target.value)} className="border-2 rounded-xl px-4 py-2.5 text-sm dark:bg-gray-800 dark:border-gray-700">
            {FILTER_OPTIONS.urgencies.map(o => <option key={o}>{o}</option>)}
          </select>

          <select value={status} onChange={e => setStatus(e.target.value)} className="border-2 rounded-xl px-4 py-2.5 text-sm dark:bg-gray-800 dark:border-gray-700">
            {FILTER_OPTIONS.statuses.map(o => <option key={o}>{o}</option>)}
          </select>

          <select value={category} onChange={e => setCategory(e.target.value)} className="border-2 rounded-xl px-4 py-2.5 text-sm dark:bg-gray-800 dark:border-gray-700">
            {FILTER_OPTIONS.categories.map(o => <option key={o}>{o}</option>)}
          </select>

          <div className="ml-auto flex gap-2">
            <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
            <Button onClick={applyFilters}>Apply Filters</Button>
          </div>
        </div>
      </Card>

      <div className="mt-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
  {loading ? (
    <p>Loading complaints...</p>
  ) : (

    <div className="overflow-x-auto sm:overflow-x-visible">
      <table className="w-full text-sm min-w-[600px] sm:min-w-full">
        <thead className="dark:bg-gray-700">
          <tr className="text-left border-b dark:border-gray-600">
            {["ID","Customer","Category","Urgency","Status","Actions"].map(h => (
              <th key={h} className="pb-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((c, i) => (
            <tr key={c.id} className={i % 2 === 0 ? "bg-gray-50 dark:bg-gray-700" : "dark:bg-gray-800"}>
              <td className="py-3 px-4">{c.id}</td>
              <td className="py-3 px-4">{c.customer_name}</td>
              <td className="py-3 px-4">{c.category || "-"}</td>
              <td className="py-3 px-4"><Badge label={c.urgency || "N/A"} type={c.urgency || "Medium"} /></td>
              <td className="py-3 px-4"><Badge label={c.status} type={c.status} /></td>
              <td className="py-3 px-4">
                <span onClick={() => navigate(`/admin/complaints/${c.id}`)} className="text-blue-600 cursor-pointer">
                  View
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</Card>

      </div>
    </div>
  );
}

export default Complaints;
