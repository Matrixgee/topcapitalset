import { useEffect } from "react";
import { BiTrendingUp } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { FiBarChart2, FiTarget } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

const HowItWorks = () => {

   useEffect(() => {
        AOS.init({
          duration: 800,
          easing: "ease-in-out",
          once: true,
          mirror: false,
        });
      }, []);

  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description: "Sign up in minutes with our simple onboarding process.",
      color: "#304F9C",
      icon: <FaUserFriends size={32} />
    },
    {
      number: "02",
      title: "Set Your Investment Goals",
      description: "Define your financial objectives and risk tolerance.",
      color: "#4ECDC4",
      icon: <FiTarget size={32} />
    },
    {
      number: "03",
      title: "Review Recommendations",
      description: "Get AI-powered investment suggestions tailored to your profile.",
      color: "#FFD166",
      icon: <FiBarChart2 size={32} />
    },
    {
      number: "04",
      title: "Start Investing",
      description: "Make your first investment and begin growing your portfolio.",
      color: "#FF6B6B",
      icon: <BiTrendingUp size={32} />
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-gradient-to-r from-[#304F9C] to-[#4ECDC4]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            How <span className="text-[#FFD166]">TopCapitalSet</span> Works
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Getting started is easy. Follow these simple steps to begin your investment journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              data-aos="fade-up"
              data-aos-delay={index * 300}
              key={index} 
              className="bg-white p-6 rounded-lg relative hover:shadow-xl transition-all transform hover:-translate-y-2"
            >
              <div 
                className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: step.color }}
              >
                {index + 1}
              </div>
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${step.color}20` }}
              >
                <div className="text-2xl" style={{ color: step.color }}>
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#212529] mb-2">{step.title}</h3>
              <p className="text-[#6C757D]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks