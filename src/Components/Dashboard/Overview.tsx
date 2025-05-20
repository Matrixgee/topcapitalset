// ExampleDashboardPage.jsx - A sample page to show content layout

import {
  FiActivity,
  FiUsers,
  FiDollarSign,
  FiShoppingBag,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Overview = () => {
  // Sample data for the chart
  const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 500 },
    { name: "Jun", value: 900 },
    { name: "Jul", value: 700 },
  ];

  // Stats cards data
  const statsCards = [
    {
      title: "Total Revenue",
      value: "$24,560",
      change: "+8%",
      icon: <FiDollarSign size={24} />,
      color: "bg-blue-600",
    },
    {
      title: "Active Users",
      value: "1,259",
      change: "+12%",
      icon: <FiUsers size={24} />,
      color: "bg-green-600",
    },
    {
      title: "New Orders",
      value: "684",
      change: "+5%",
      icon: <FiShoppingBag size={24} />,
      color: "bg-purple-600",
    },
    {
      title: "Growth Rate",
      value: "24%",
      change: "+2%",
      icon: <FiActivity size={24} />,
      color: "bg-yellow-600",
    },
  ];

  return (
    <div className="w-full h-full p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-400">
          Welcome back, here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-400 font-medium">{stat.title}</div>
              <div className={`${stat.color} rounded-lg p-2 text-white`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-white text-2xl font-bold mb-1">
              {stat.value}
            </div>
            <div className="text-green-500 text-sm">
              {stat.change}{" "}
              <span className="text-gray-400">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-gray-800 rounded-lg p-4 shadow-lg mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Revenue Overview
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  color: "#F9FAFB",
                }}
              />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          <button className="text-sm text-blue-400 hover:text-blue-300">
            View all
          </button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex items-start p-3 hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                {item % 2 === 0 ? "JP" : "AS"}
              </div>
              <div className="ml-3">
                <div className="text-white text-sm font-medium">
                  {item % 2 === 0 ? "John Peterson" : "Anna Smith"}
                </div>
                <div className="text-gray-400 text-sm">
                  {item % 2 === 0
                    ? "Created a new project"
                    : "Updated their profile"}
                </div>
                <div className="text-gray-500 text-xs mt-1">
                  {item} hour{item !== 1 ? "s" : ""} ago
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
