import { BiChevronRight } from "react-icons/bi";
import bg from "../../assets/bg.jpeg"
import { useNavigate } from "react-router-dom";


const Hero = () => {

const navigate = useNavigate()

  return (
    <section className="relative pt-24 min-h-screen flex items-center bg-gradient-to-b from-[#E6EFFF] via-white to-[#F8F9FA]"
  style={{
    backgroundImage: `linear-gradient(rgba(48, 79, 156, 0.5), rgba(48, 79, 156, 0.5)), url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'overlay'
  }}
>
      <div className="container mx-auto px-6 md:px-12 py-12 md:flex flex flex-col justify-center items-center">
        <div className="md:w-1/2 mb-12 md:mb-0 flex flex-col items-center">
          <h2 className=" text-center text-5xl md:text-3xl lg:text-5xl font-bold text-[white] mb-6">
            Smart Investing for Your <span className="text-[#4374f0]">Financial</span> <span className="text-[#FF6B6B]">Future</span>
          </h2>
          <p className="text-lg text-[#bec0c0] text-center w-full lg:w-[50%]] mb-8">
            Take control of your investments with our intuitive platform. Get personalized recommendations, track performance, and grow your wealth with confidence.
          </p>
          <div className="flex flex-row md:flex-col lg:flex-row gap-[20px] space-y-4 sm:space-y-0 sm:space-x-4">
            <button onClick={()=>navigate("/login")} className="bg-[#304F9C] text-white px-8 py-3 rounded-md flex items-center justify-center hover:bg-opacity-90 transition-all">
              Start Investing <BiChevronRight size={20} className="ml-2" />
            </button>
            <button className="bg-[#4ECDC4] text-white px-[12px] rounded-md space-y-4 sm:space-y-0 sm:space-x-4rounded-md hover:bg-opacity-90 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero
