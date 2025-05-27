/* eslint-disable @typescript-eslint/no-explicit-any */
// DashHeader.jsx
import { useState, useRef, useEffect } from "react";
import { IoMdMenu, IoMdSearch } from "react-icons/io";

import { FaCaretDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../Function/Slice";

interface DashHeaderProps {
  toggleSidebar: () => void;
}

const DashHeader = ({ toggleSidebar }: DashHeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userMenuRef = useRef(null);

  const user = useSelector((state: any) => state.mySlice.tradeUser);

  // Handle clicks outside the dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !(userMenuRef.current as any).contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handlelogout = () => {
    dispatch(userLogout());
    navigate("/auth/login");
  };

  return (
    <div className="w-full h-16 bg-[#14141b] shadow-md border-b border-gray-800 flex items-center justify-between px-4">
      {/* Left section: Menu toggle & Search */}
      <div className="flex items-center">
        {/* Menu toggle - only visible on mobile */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-gray-400 hover:text-white p-2 mr-2"
        >
          <IoMdMenu size={24} />
        </button>

        {/* Search bar */}
        <div className="relative max-w-md hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 bg-gray-800 text-gray-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <IoMdSearch
            className="absolute left-3 top-2.5 text-gray-400"
            size={18}
          />
        </div>
      </div>

      {/* Right section: Notifications & User menu */}
      <div className="flex items-center space-x-4">
        {/* Icons */}

        {/* User profile */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 hover:bg-gray-800 rounded-lg p-1 pr-2 transition-colors duration-200"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="text-gray-200 hidden md:inline-block">
              {user.fullName}
            </span>
            <FaCaretDown className="text-gray-400" size={12} />
          </button>

          {/* User dropdown menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-50">
              <div className="p-3 border-b border-gray-800">
                <p className="text-sm font-medium text-white">
                  {user.fullName}
                </p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>

              <div className="p-2">
                {["Profile", "Settings", "Dashboard"].map((item) => (
                  <button
                    key={item}
                    className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition-colors duration-200"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="border-t border-gray-800 p-2">
                <button
                  onClick={handlelogout}
                  className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-md transition-colors duration-200"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashHeader;
