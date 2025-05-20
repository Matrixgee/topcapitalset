import CTA from "./CTA";
import Features from "./Features";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default Home;