import logo from '../../assets/logo.png'

const Footer = () => {
  return (
     <footer className="bg-[#212529] text-white py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src={logo} alt="" className="w-[100px] h-[100px]" />
            <p className="text-[#6C757D]">
              Your trusted partner for intelligent investing and financial growth.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="bg-[#304F9C] w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-all">
                <span>f</span>
              </a>
              <a href="#" className="bg-[#4ECDC4] w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-all">
                <span>t</span>
              </a>
              <a href="#" className="bg-[#FF6B6B] w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-all">
                <span>in</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-[#4874e2]">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#6C757D] hover:text-white">About Us</a></li>
              <li><a href="#" className="text-[#6C757D] hover:text-white">Careers</a></li>
              <li><a href="#" className="text-[#6C757D] hover:text-white">Press</a></li>
              <li><a href="#" className="text-[#6C757D] hover:text-white">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-[#4874e2]">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#6C757D] hover:text-white">Help Center</a></li>
              <li><a href="#" className="text-[#6C757D] hover:text-white">Investment Guide</a></li>
              <li><a href="#" className="text-[#6C757D] hover:text-white">Market News</a></li>
              <li><a href="#" className="text-[#6C757D] hover:text-white">Webinars</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-[#4874e2]">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#6C757D] hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-[#6C757D] hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-[#6C757D] hover:text-white">Security</a></li>
              <li><a href="#" className="text-[#6C757D] hover:text-white">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-[#6C757D]">© {new Date().getFullYear()} TopCapitalSet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
