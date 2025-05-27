// Menu.jsx
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";

import { LuWallet } from "react-icons/lu";
import { GiTrade } from "react-icons/gi";
import { PiSwap } from "react-icons/pi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";

import { TbPackages } from "react-icons/tb";

type MenuProps = {
  isMobile?: boolean;
  closeSidebar?: () => void;
};

const Menu = ({ isMobile = false, closeSidebar }: MenuProps) => {
  const user = useSelector((state: any) => state.mySlice.tradeUser);

  // Navigation items array for easier management
  const navItems = [
    {
      path: "/user/overview",
      name: "Dashboard",
      icon: <RxDashboard className="w-5 h-5" />,
    },
    {
      path: "my-plans",
      name: "My Plans",
      icon: <LuWallet className="w-5 h-5" />,
    },
    {
      path: "deposit",
      name: "Deposit",
      icon: <GiTrade className="w-5 h-5" />,
    },
    {
      path: "withdraw",
      name: "Withdraw",
      icon: <BiMoneyWithdraw className="w-5 h-5" />,
    },
    {
      path: "transaction",
      name: "Transactions",
      icon: <PiSwap className="w-5 h-5" />,
    },
    {
      path: "tradingplans",
      name: "Trading Plans",
      icon: <TbPackages className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-full h-full bg-[#14141b] flex flex-col overflow-hidden border-r border-gray-800">
      {/* Logo and close button (for mobile) */}
      <div className="w-full h-16 flex justify-between items-center px-4 border-b border-gray-800">
        <div className="text-xl font-bold text-white">
          Top Capital<span className="text-blue-500">Set</span>
        </div>

        {isMobile && (
          <button
            onClick={closeSidebar}
            className="text-gray-400 hover:text-white p-2"
          >
            <IoClose size={24} />
          </button>
        )}
      </div>

      {/* Main navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        {/* Profile section */}
        <div className="mb-6 p-3 bg-gray-800 rounded-lg">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-white">
                {user.fullName}
              </div>
              <div className="text-xs text-gray-400">User</div>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <div className="space-y-2">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={isMobile ? closeSidebar : undefined}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
              end
            >
              {({ isActive }) => (
                <>
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                  {/* Active indicator dot */}
                  {isActive && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-white"></span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
