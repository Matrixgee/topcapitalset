import { useState } from 'react';
import { BiCheck, BiGlobe, BiMapPin, BiMessageSquare, BiPhone } from 'react-icons/bi';
import { CgMail } from 'react-icons/cg';
import { CiClock1} from 'react-icons/ci';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Custom styles based on provided color scheme
  const styles = {
    primaryBlue: '#304F9C',
    lightBlue: '#E6EFFF',
    accentCoral: '#FF6B6B',
    accentTeal: '#4ECDC4',
    accentGold: '#FFD166',
    darkText: '#212529',
    grayText: '#6C757D',
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please fill out all required fields');
      return;
    }
    
    // In a real app, you would send the form data to your backend here
    console.log('Form submitted:', formData);
    
    // Show success message
    setFormSubmitted(true);
    setFormError(null);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      topic: '',
      message: ''
    });
  };

  const contactMethods = [
    {
      title: 'Email Us',
      description: 'Get in touch via email and we will respond within 24 hours',
      icon: <CgMail size={24} color="white" />,
      contact: 'support@investwise.com',
      color: styles.accentCoral
    },
    {
      title: 'Call Us',
      description: 'Speak directly with our support team',
      icon: <BiPhone size={24} color="white" />,
      contact: '(800) 555-0123',
      color: styles.accentTeal
    },
    {
      title: 'Visit Us',
      description: 'Come to our headquarters during business hours',
      icon: <BiMapPin size={24} color="white" />,
      contact: '123 Financial District, New York, NY 10005',
      color: styles.accentGold
    },
  ];

  const frequentTopics = [
    "Account Setup",
    "Investment Strategy",
    "Portfolio Transfer",
    "Technical Support",
    "Security Concerns",
    "Billing & Subscription"
  ];

  return (
    <div className="flex flex-col min-h-screen text-base" style={{ color: styles.darkText }}>
      {/* Hero Section */}
      <section className="py-16 px-6 pt-[120px] text-center" style={{ backgroundColor: styles.lightBlue }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4" style={{ color: styles.primaryBlue }}>
            Get in Touch
          </h1>
          <p className="text-xl mb-0" style={{ color: styles.grayText }}>
            We're here to help with any questions about your investment journey
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg shadow-md">
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4" 
                  style={{ backgroundColor: method.color }}
                >
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: styles.primaryBlue }}>
                  {method.title}
                </h3>
                <p className="mb-4" style={{ color: styles.grayText }}>
                  {method.description}
                </p>
                <p className="font-medium">{method.contact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-16 px-6" style={{ backgroundColor: styles.lightBlue }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-4" style={{ color: styles.primaryBlue }}>
                Office Hours
              </h2>
              <div className="flex items-start gap-4 mb-4">
                <CiClock1 size={24} style={{ color: styles.primaryBlue }} />
                <div>
                  <p className="font-medium mb-1">Monday - Friday</p>
                  <p style={{ color: styles.grayText }}>9:00 AM - 6:00 PM EST</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CiClock1 size={24} style={{ color: styles.primaryBlue }} />
                <div>
                  <p className="font-medium mb-1">Saturday</p>
                  <p style={{ color: styles.grayText }}>10:00 AM - 2:00 PM EST</p>
                </div>
              </div>
              <p className="mt-4 text-sm" style={{ color: styles.grayText }}>
                Our customer service team is available during these hours. 
                For urgent matters outside these hours, please use our 24/7 emergency support line.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <img src="/api/placeholder/400/320" alt="Office location map" className="rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: styles.primaryBlue }}>
            Send Us a Message
          </h2>
          
          {formSubmitted ? (
            <div 
              className="bg-green-100 border border-green-200 text-green-700 p-4 rounded-lg mb-6 flex items-center gap-3"
            >
              <BiCheck size={20} />
              <p className="m-0">Thank you for your message! We'll get back to you shortly.</p>
            </div>
          ) : formError ? (
            <div 
              className="bg-red-100 border border-red-200 text-red-700 p-4 rounded-lg mb-6"
            >
              {formError}
            </div>
          ) : null}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring"
                style={{ '--tw-ring-color': styles.primaryBlue } as React.CSSProperties}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring"
                style={{ '--tw-ring-color': styles.primaryBlue } as React.CSSProperties}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="phone" className="block mb-2 font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring"
                style={{ '--tw-ring-color': styles.primaryBlue } as React.CSSProperties}
                />
              </div>
              <div>
                <label htmlFor="topic" className="block mb-2 font-medium">
                  Topic
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring"
                style={{ '--tw-ring-color': styles.primaryBlue } as React.CSSProperties}

                >
                  <option value="">Select a topic</option>
                  {frequentTopics.map((topic, index) => (
                    <option key={index} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 font-medium">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows= {5}
                className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring"
  style={{ '--tw-ring-color': styles.primaryBlue } as React.CSSProperties}
                required
              ></textarea>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 rounded-lg text-white font-semibold"
                style={{ backgroundColor: styles.primaryBlue }}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="py-16 px-6" style={{ backgroundColor: styles.lightBlue }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: styles.primaryBlue }}>
            Looking for Quick Answers?
          </h2>
          <p className="text-lg mb-8" style={{ color: styles.grayText }}>
            Check out our comprehensive resources for investors
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: styles.accentTeal }}>
                <BiMessageSquare color="white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: styles.primaryBlue }}>
                FAQ Database
              </h3>
              <p className="mb-4 w-[35  0px]" style={{ color: styles.grayText }}>
                Find answers to commonly asked questions about our platform and services
              </p>
              <button className="mt-auto text-white px-6 py-2 rounded-lg" style={{ backgroundColor: styles.primaryBlue }}>
                Browse FAQs
              </button>
            </div>
            
          </div>
        </div>
      </section>


    </div>
  );
}

export default ContactPage