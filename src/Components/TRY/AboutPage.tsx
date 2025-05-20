import { useEffect, useState } from 'react';
import { FaChevronDown, FaQuestionCircle, FaUserFriends } from 'react-icons/fa';
import { BiShield } from 'react-icons/bi';
import { FiZap } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutPage() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index:any) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  const styles = {
    primaryBlue: '#304F9C',
    lightBlue: '#E6EFFF',
    accentCoral: '#FF6B6B',
    accentTeal: '#4ECDC4',
    accentGold: '#FFD166',
    darkText: '#212529',
    grayText: '#6C757D',
  };

  const faqs = [
    {
      question: "How does InvestWise ensure the security of my investments?",
      answer: "InvestWise employs bank-level encryption, two-factor authentication, and regular security audits. Your funds are protected up to $500,000 through our partnership with SIPC, and we never store your sensitive financial information on our servers."
    },
    {
      question: "What are the fees associated with using InvestWise?",
      answer: "InvestWise operates on a transparent fee structure with no hidden costs. Our basic account is free, while Premium accounts are $9.99 monthly with advanced features. There are no trading commissions on standard trades, and we offer volume discounts for active investors."
    },
    {
      question: "Can I transfer my existing portfolio to InvestWise?",
      answer: "Absolutely! We've made portfolio transfers seamless and hassle-free. You can transfer existing investments from other platforms without selling your positions, and our dedicated transfer team handles all the paperwork for you. Most transfers complete within 5-7 business days."
    },
    {
      question: "What investment options are available on InvestWise?",
      answer: "InvestWise offers a comprehensive range of investment options including stocks, ETFs, bonds, mutual funds, and curated thematic portfolios. Our platform supports both domestic and international markets, allowing you to build a truly diversified investment strategy."
    }
  ];
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen text-base" style={{ color: styles.darkText }}>
      {/* Hero Section */}
      <section className="py-20 pt-[140px] px-6 text-center" style={{ backgroundColor: styles.lightBlue }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: styles.primaryBlue }}>
            Investing Made Simple, Smart, and Secure
          </h1>
          <p className="text-xl mb-8" style={{ color: styles.grayText }}>
            TopCapitalSet is on a mission to democratize investing by providing powerful tools and insights that were once available only to financial professionals.
          </p>
          <button onClick={()=>navigate("/auth/register")} className="px-8 py-3 rounded-lg text-white font-semibold" style={{ backgroundColor: styles.primaryBlue }}>
            Start Investing Today
          </button>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: styles.primaryBlue }}>Our Story</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-full lg:w-1/2 w-[100%]" data-aos="fade-right" data-aos-delay="1000">
              <div className="bg-gray-200 h-64 w-full rounded-lg flex items-center justify-center">
                <img src="/api/placeholder/400/320" alt="InvestWise founding team" className="rounded-lg" />
              </div>
            </div>
            <div className="md:w-1/2" data-aos="fade-left" data-aos-delay="1000">
              <p className="mb-4">
                Founded in 2020, InvestWise emerged from a simple observation: investing shouldn't be complicated or exclusive. Our founders, frustrated with the unnecessary complexity of traditional investment platforms, set out to build something different.
              </p>
              <p>
                Today, we serve over 1 million users worldwide, managing more than $2 billion in assets. Our team of financial experts and technologists work tirelessly to make investing accessible, transparent, and rewarding for everyone—whether you're just starting out or managing a substantial portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6" style={{ backgroundColor: styles.lightBlue }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: styles.primaryBlue }}>Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
             data-aos="fade-up"
     data-aos-duration="2000"
             className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: styles.accentCoral }}>
                <BiShield color="white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: styles.primaryBlue }}>Security First</h3>
              <p style={{ color: styles.grayText }}>
                Your financial security is our priority. We implement the highest standards of protection for your investments and personal data.
              </p>
            </div>

            <div 
            data-aos="fade-up"
     data-aos-duration="2000"
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: styles.accentTeal }}>
                <FiZap color="white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: styles.primaryBlue }}>Innovation</h3>
              <p style={{ color: styles.grayText }}>
                We constantly evolve our platform with cutting-edge technology to provide you with the most effective investment tools.
              </p>
            </div>

            <div 
            data-aos="fade-up"
     data-aos-duration="2800"
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: styles.accentGold }}>
                <FaUserFriends color="white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: styles.primaryBlue }}>Inclusivity</h3>
              <p style={{ color: styles.grayText }}>
                We believe everyone deserves access to powerful financial tools, regardless of their experience level or account balance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6" style={{ backgroundColor: styles.primaryBlue, color: "white" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2" style={{ color: styles.accentGold }}>1M+</p>
              <p className="text-lg">Active Users</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2" style={{ color: styles.accentTeal }}>$2B+</p>
              <p className="text-lg">Assets Under Management</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2" style={{ color: styles.accentCoral }}>4.8/5</p>
              <p className="text-lg">Average App Rating</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: styles.primaryBlue }}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`border border-gray-800 rounded-xl transition-all duration-300 ${
                expandedFaq === index
                  ? "bg-white hover:border-[#4f67ff]"
                  : "bg-white hover:border-[#5a6ff1]"
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-5 text-left group"
              >
                <div className="flex items-center gap-3">
                  <FaQuestionCircle className="text-[#818ee3]" />
                  <h3 className="text-lg font-medium group-hover:text-[#6271d1]">
                    {faq.question}
                  </h3>
                </div>
                <motion.span
                  animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#586bff]"
                >
                  <FaChevronDown />
                </motion.span>
              </button>
              <AnimatePresence>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-gray-300"
                    style={{color: styles.primaryBlue}}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6" style={{ backgroundColor: styles.primaryBlue }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Start Your Investment Journey?</h2>
          <p className="text-white mb-8 text-lg">Join thousands of investors who are growing their wealth with InvestWise</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 text-2xl rounded-lg font-semibold bg-white" style={{ color: styles.primaryBlue }}>
              Create An Account
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}