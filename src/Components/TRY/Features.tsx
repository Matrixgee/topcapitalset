import { BiAward, BiPieChart, BiShield, BiTrendingUp } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { FiBarChart2 } from "react-icons/fi";

const Features = () => {
  const featureItems = [
    {
      icon: <FiBarChart2 size={48} className="text-[#304F9C]" />,
      title: "Smart Portfolio Analysis",
      description: "Get detailed insights into your investment performance with advanced analytics and visualization tools.",
      color: "#304F9C",
      bgColor: "#E6EFFF"
    },
    {
      icon: <BiShield size={48} className="text-[#FF6B6B]" />,
      title: "Secure Investment",
      description: "Bank-level security measures to keep your financial data and investments safe.",
      color: "#FF6B6B",
      bgColor: "#FFF0F0"
    },
    {
      icon: <BiTrendingUp size={48} className="text-[#4ECDC4]" />,
      title: "Performance Tracking",
      description: "Monitor your investments in real-time with beautiful charts and comprehensive data.",
      color: "#4ECDC4",
      bgColor: "#EAFAF8"
    },
    {
      icon: <BiPieChart size={48} className="text-[#FFD166]" />,
      title: "Diversification Tools",
      description: "Optimize your portfolio allocation with intelligent diversification recommendations.",
      color: "#FFD166",
      bgColor: "#FFF9E6"
    },
    {
      icon: <FaUserFriends size={48} className="text-[#304F9C]" />,
      title: "Expert Advisory",
      description: "Access to financial experts and AI-powered recommendations tailored to your goals.",
      color: "#304F9C",
      bgColor: "#E6EFFF"
    },
    {
      icon: <BiAward size={48} className="text-[#FF6B6B]" />,
      title: "Premium Research",
      description: "Exclusive market insights and premium research reports from industry experts.",
      color: "#FF6B6B",
      bgColor: "#FFF0F0"
    }
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#212529] mb-4">
            Features Designed for <span className="text-[#304F9C]">Modern</span> <span className="text-[#FF6B6B]">Investors</span>
          </h2>
          <p className="text-[#6C757D] max-w-2xl mx-auto">
            Our platform offers everything you need to make informed investment decisions and grow your wealth effectively.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-${feature.bgColor} p-6 rounded-lg hover:shadow-lg transition-all border-l-4`}
              style={{ backgroundColor: feature.bgColor, borderLeftColor: feature.color }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-[#212529] mb-2">{feature.title}</h3>
              <p className="text-[#6C757D]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features
