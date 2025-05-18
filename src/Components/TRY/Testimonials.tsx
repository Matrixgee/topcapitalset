const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      testimonial: "TopCapitalSet has transformed how I approach retirement planning. The platform is intuitive and the recommendations are spot-on.",
      avatar: "/api/placeholder/64/64",
      bgColor: "#E6EFFF",
      borderColor: "#304F9C"
    },
    {
      name: "David Chen",
      role: "Software Engineer",
      testimonial: "As someone new to investing, this platform has been invaluable. The educational resources and easy-to-use interface helped me build confidence.",
      avatar: "/api/placeholder/64/64",
      bgColor: "#EAFAF8",
      borderColor: "#4ECDC4"
    },
    {
      name: "Emily Roberts",
      role: "Marketing Director",
      testimonial: "The portfolio analysis tools are exceptional. I can easily track performance and make adjustments based on clear insights.",
      avatar: "/api/placeholder/64/64",
      bgColor: "#FFF9E6",
      borderColor: "#FFD166"
    }
  ];

  return (
    <section id="testimonials" className="py-16 bg-[#F8F9FA]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#212529] mb-4">
            What Our <span className="text-[#304F9C]">Clients</span> <span className="text-[#FF6B6B]">Say</span>
          </h2>
          <p className="text-[#6C757D] max-w-2xl mx-auto">
            Thousands of investors trust TopCapitalSet to help them achieve their financial goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="p-6 rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-1"
              style={{ 
                backgroundColor: testimonial.bgColor,
                borderLeft: `4px solid ${testimonial.borderColor}`
              }}
            >
              <div className="text-[#FF6B6B] text-6xl font-serif opacity-20 absolute top-2 left-4">"</div>
              <p className="text-[#212529] italic relative z-10 mb-6">"{testimonial.testimonial}"</p>
              <div className="flex items-center">
                <div 
                  className="w-12 h-12 rounded-full overflow-hidden border-2 mr-4" 
                  style={{ borderColor: testimonial.borderColor }}
                >
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-[#212529]">{testimonial.name}</h4>
                  <p className="text-sm text-[#6C757D]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials
