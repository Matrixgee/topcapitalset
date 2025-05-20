import { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-blue-200 to-[#E6EFFF] py-1 px-6 md:px-12 flex justify-between items-center shadow-md fixed w-full z-50">
      <div className="flex items-center">
        <img src={logo} alt="" className="w-full h-[5rem] object-cover" />
      </div>
      <nav className="hidden md:flex items-center space-x-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "hover:text-[#304F9C] text-[#304F9C] font-bold "
              : "text-[#212529] hover:text-[#304F9C] font-medium"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "hover:text-[#304F9C] text-[#304F9C] font-bold "
              : "text-[#212529] hover:text-[#304F9C] font-medium"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "hover:text-[#304F9C] text-[#304F9C] font-bold "
              : "text-[#212529] hover:text-[#304F9C] font-medium"
          }
        >
          Contact
        </NavLink>

        <div className="flex flex-row gap-[10px]">
          <button
            onClick={() => navigate("/auth/register")}
            className="border-[1px] cursor-pointer border-[#304F9C] text-[#304F9C] hover:bg-[#304F9C] hover:text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-all"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/auth/login")}
            className="border-[1px] cursor-pointer border-[#304F9C] bg-[#304F9C] hover:border-[1px] hover:bg-transparent hover:text-[#304F9C] hover:border-[#304F9C] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-all"
          >
            Login
          </button>
        </div>
      </nav>

      <button
        className="md:hidden text-[#304F9C]"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <BiX size={24} /> : <BiMenu size={24} />}
      </button>
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-4">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#212529] hover:text-[#304F9C] font-medium"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#212529] hover:text-[#304F9C] font-medium"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#212529] hover:text-[#304F9C] font-medium"
          >
            Contact
          </NavLink>
          <button
            onClick={() => navigate("/auth/register")}
            className="bg-[#304F9C] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-all"
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
};
export default Header;
