import { FiDollarSign } from "react-icons/fi";
import { useSelector } from "react-redux";
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
  const user = useSelector((state: any) => state.mySlice.tradeUser);
  const { fullName = "User", acctBalance = 0 } = user || {};

  const data = [
    { name: "Jan", value: 200 },
    { name: "Feb", value: 100 },
    { name: "Mar", value: 0 },
    { name: "Apr", value: 0 },
    { name: "May", value: acctBalance },
  ];

  const statsCards = [
    {
      title: "Account Balance",
      value: `$${acctBalance.toFixed(2)}`,
      change: "+0%",
      icon: <FiDollarSign size={24} />,
      color: "bg-blue-600",
    },
  ];

  return (
    <div className="w-full min-h-screen p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-1">
          Welcome, {fullName}
        </h1>
        <p className="text-gray-400">
          Here's a quick overview of your financial activity.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm font-medium">
                {stat.title}
              </span>
              <div className={`${stat.color} p-2 rounded-lg text-white`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-white text-3xl font-semibold mb-2">
              {stat.value}
            </div>
            <div className="text-green-500 text-sm">
              {stat.change} <span className="text-gray-400">this month</span>
            </div>
            <button className="mt-3 text-blue-400 text-sm hover:underline">
              View details
            </button>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">
          Balance Overview
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
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
    </div>
  );
};

export default Overview;
