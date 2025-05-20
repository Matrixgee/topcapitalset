/* eslint-disable @typescript-eslint/no-explicit-any */
// DashHeader.jsx
import { useState, useRef, useEffect } from "react";
import { IoMdMenu, IoMdNotificationsOutline, IoMdSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FiMail } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa";

interface DashHeaderProps {
  toggleSidebar: () => void;
}

const DashHeader = ({ toggleSidebar }: DashHeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

  // Handle clicks outside the dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !(userMenuRef.current as any).contains(event.target)
      ) {
        setShowUserMenu(false);
      }
      if (
        notificationRef.current &&
        !(notificationRef.current as any).contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <div className="flex items-center space-x-2">
          {/* Settings */}
          <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800">
            <IoSettingsOutline size={20} />
          </button>

          {/* Mail */}
          <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 relative">
            <FiMail size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <IoMdNotificationsOutline size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-50">
                <div className="p-3 border-b border-gray-800 flex justify-between items-center">
                  <h3 className="font-medium text-white">Notifications</h3>
                  <span className="text-xs px-2 py-1 bg-blue-600 text-white rounded-full">
                    3 New
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto">
                  {/* Sample notifications */}
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="p-3 border-b border-gray-800 hover:bg-gray-800 transition-colors duration-200"
                    >
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                          {item % 2 === 0 ? "U" : "S"}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-white">
                            {item % 2 === 0
                              ? "User update completed"
                              : "System alert detected"}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {item} hour{item !== 1 ? "s" : ""} ago
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 text-center">
                  <button className="text-sm text-blue-400 hover:text-blue-300">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User profile */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 hover:bg-gray-800 rounded-lg p-1 pr-2 transition-colors duration-200"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
              JD
            </div>
            <span className="text-gray-200 hidden md:inline-block">
              John Doe
            </span>
            <FaCaretDown className="text-gray-400" size={12} />
          </button>

          {/* User dropdown menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-50">
              <div className="p-3 border-b border-gray-800">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-gray-400">john.doe@example.com</p>
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
                <button className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-md transition-colors duration-200">
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
