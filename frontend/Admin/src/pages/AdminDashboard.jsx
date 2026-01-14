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
  CartesianGrid
} from "recharts";
import { Users, AlertCircle, CheckCircle, Clock } from "lucide-react"; 

import { API_URL } from "../App"; 
import { useTheme } from "../Context/ThemeContext"; 

import "../Style.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0, rejected: 0 });
  const [categoryData, setCategoryData] = useState([]);
  const { theme } = useTheme(); 

 
  const getChartColors = () => {
    const isDark = theme === "dark";
    return {
      pending: isDark ? "#FBBF24" : "#F59E0B",
      resolved: isDark ? "#34D399" : "#059669",
      rejected: isDark ? "#F87171" : "#DC2626",
      bar: isDark ? "#818CF8" : "#6366F1",
      text: isDark ? "#9CA3AF" : "#6B7280",
      grid: isDark ? "#374151" : "#E5E7EB",
      tooltipBg: isDark ? "#1E293B" : "#FFFFFF",
    };
  };

  const chartColors = getChartColors();

  useEffect(() => {
   
    axios.get(`${API_URL}/api/complaints`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
    .then((res) => {
      const complaints = res.data;
      setStats({
        total: complaints.length,
        pending: complaints.filter((c) => c.status === "pending").length,
        resolved: complaints.filter((c) => c.status === "resolved").length,
        rejected: complaints.filter((c) => c.status === "rejected").length,
      });

      const categories = {};
      complaints.forEach((c) => { categories[c.category] = (categories[c.category] || 0) + 1; });
      setCategoryData(Object.keys(categories).map((key) => ({ category: key, count: categories[key] })));
    });
  }, []);

  const statusChartData = [
    { name: "Pending", value: stats.pending },
    { name: "Resolved", value: stats.resolved },
    { name: "Rejected", value: stats.rejected },
  ];

  const STATUS_COLORS_MAP = {
    Pending: chartColors.pending,
    Resolved: chartColors.resolved,
    Rejected: chartColors.rejected,
  };

  return (
    // STRUCTURE: Tailwind | COLOR: admin-page (from adminStyle.css)
    <div className="p-8 admin-page">
      
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold admin-header">Admin Dashboard 📊</h1>
          <p className="text-sub mt-1">Overview of campus grievances and resolution status.</p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Total Complaints" 
          value={stats.total} 
          icon={<Users className="w-6 h-6" />} 
          variant="stat-card-neutral" 
        />
        <StatCard 
          title="Pending" 
          value={stats.pending} 
          icon={<Clock className="w-6 h-6" />} 
          variant="stat-card-warning" 
        />
        <StatCard 
          title="Resolved" 
          value={stats.resolved} 
          icon={<CheckCircle className="w-6 h-6" />} 
          variant="stat-card-positive" 
        />
        <StatCard 
          title="Rejected" 
          value={stats.rejected} 
          icon={<AlertCircle className="w-6 h-6" />} 
          variant="stat-card-danger" 
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Bar Chart */}
        <div className="p-6 admin-card">
          <h2 className="font-bold text-lg mb-6 text-main">Complaints by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
              <XAxis dataKey="category" stroke={chartColors.text} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke={chartColors.text} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ backgroundColor: chartColors.tooltipBg, borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                itemStyle={{ color: chartColors.text, fontWeight: 'bold' }}
              />
              <Bar dataKey="count" fill={chartColors.bar} radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="p-6 admin-card">
          <h2 className="font-bold text-lg mb-6 text-main">Resolution Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={5}
                stroke="none"
              >
                {statusChartData.map((entry, index) => (
                  <Cell key={index} fill={STATUS_COLORS_MAP[entry.name]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: chartColors.tooltipBg, borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                itemStyle={{ color: chartColors.text, fontWeight: 'bold' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                formatter={(value) => <span style={{ color: chartColors.text, marginLeft: '5px' }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}


function StatCard({ title, value, icon, variant }) {
  return (
    <div className="p-6 admin-card flex items-center justify-between hover:-translate-y-1 transition-transform">
      <div>
        <p className="text-sub text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
        <p className="text-4xl font-extrabold text-main">{value}</p>
      </div>
      <div className={`p-4 rounded-2xl ${variant}`}>
        {icon}
      </div>
    </div>
  );
}