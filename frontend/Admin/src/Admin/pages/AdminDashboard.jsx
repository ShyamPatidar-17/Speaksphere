import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { API_URL } from "../../App";

const STATUS_COLORS = {
  Pending: "#F59E0B", // 🟡 Yellow
  Resolved: "#22C55E", // 🟢 Green
  Rejected: "#EF4444", // 🔴 Red
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    rejected: 0,
  });
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/complaints`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const complaints = res.data;

        // Basic stats
        setStats({
          total: complaints.length,
          pending: complaints.filter((c) => c.status === "pending").length,
          resolved: complaints.filter((c) => c.status === "resolved").length,
          rejected: complaints.filter((c) => c.status === "rejected").length,
        });

        // Category-wise count
        const categories = {};
        complaints.forEach((c) => {
          categories[c.category] = (categories[c.category] || 0) + 1;
        });

        const formatted = Object.keys(categories).map((key) => ({
          category: key,
          count: categories[key],
        }));

        setCategoryData(formatted);
      });
  }, []);

  const statusChartData = [
    { name: "Pending", value: stats.pending },
    { name: "Resolved", value: stats.resolved },
    { name: "Rejected", value: stats.rejected },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-indigo-700">
        Admin Dashboard 📊
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Complaints" value={stats.total} />
        <StatCard
          title="Pending"
          value={stats.pending}
          color="text-yellow-500"
        />
        <StatCard
          title="Resolved"
          value={stats.resolved}
          color="text-green-600"
        />
        <StatCard
          title="Rejected"
          value={stats.rejected}
          color="text-red-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-lg mb-4">Complaints by Category</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6366F1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-lg mb-4">
            Complaint Status Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {statusChartData.map((entry, index) => (
                  <Cell key={index} fill={STATUS_COLORS[entry.name]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Reusable Stat Card */
function StatCard({ title, value, color = "text-indigo-600" }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <p className="text-gray-500">{title}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
