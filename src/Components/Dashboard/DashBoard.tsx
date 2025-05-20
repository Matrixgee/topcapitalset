// Dashboard.jsx
import { useState } from "react";
import Menu from "./Menu";
import DashHeader from "./DashHeader";
import { Outlet } from "react-router-dom";
// import DashFooter from "./DashFooter"

const Dashboard = () => {
  // Shared state to track sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle function to be passed to both components
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to close sidebar - useful when clicking menu items or outside
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-screen flex w-full m-0 p-0 box-border overflow-hidden">
      {/* Sidebar - hidden on mobile, but available through the state */}
      <div className="w-1/4 h-screen lg:block max-md:hidden m-0 p-0 box-border">
        <Menu />
      </div>

      {/* Mobile sidebar - only shown when state is true */}
      <div
        className={`fixed top-0 left-0 h-full w-full z-50 bg-black bg-opacity-50 transition-all duration-300 lg:hidden ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      >
        <div
          className={`w-[280px] h-full bg-[#14141b] transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Menu isMobile={true} closeSidebar={closeSidebar} />
        </div>
      </div>

      {/* Main content area */}
      <div className="w-full lg:w-3/4 h-screen flex flex-col items-center bg-[#14141b] m-0 p-0 box-border overflow-y-auto">
        <DashHeader toggleSidebar={toggleSidebar} />
        <div className="w-full h-full overflow-y-auto p-4">
          <Outlet />
        </div>
        {/* <DashFooter/> */}
      </div>
    </div>
  );
};

export default Dashboard;
