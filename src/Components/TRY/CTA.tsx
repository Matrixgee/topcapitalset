import { BsArrowRight } from "react-icons/bs"

const CTA = () => {
  return (
        <section className="py-16 bg-gradient-to-r from-[#304F9C] to-[#FF6B6B] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white opacity-10"></div>
        <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full bg-white opacity-10"></div>
        <div className="absolute top-40 right-40 w-24 h-24 rounded-full bg-[#FFD166] opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Your <span className="text-[#FFD166]">Investment Journey</span>?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-blue-100">
          Join thousands of successful investors who have taken control of their financial future with TopCapitalSet.
        </p>
        <button className="bg-white text-[#304F9C] px-8 py-3 rounded-md font-bold flex items-center mx-auto hover:bg-blue-50 transition-all">
          Get Started Now <BsArrowRight size={20} className="ml-2" />
        </button>
      </div>
    </section>
  )
}

export default CTA
