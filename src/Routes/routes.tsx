import { createBrowserRouter } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Layout from "../Components/Layout";
import Insights from "../Page/Insight/Insights";
import Planning from "../Page/Planning/Planning";
import Investment from "../Page/Investment Products/Investment";
import Dashboard from "../Components/Dashboard/DashBoard";
import AdminPrivate from "./AdminPrivate";
import Admin from "../Components/Admin/Admin";
import Deposit from "../Components/Dashboard/Deposit";
import Transactions from "../Components/Dashboard/Transactions";
import TradingPlans from "../Components/Dashboard/TradingPlans";
import Withdraw from "../Components/Dashboard/Withdraw";
import Account from "../Components/Dashboard/Account";
import Profile from "../Components/Dashboard/Profile";
import Overview from "../Components/Dashboard/Overview";
import Private from "./Private";
import MyPlans from "../Components/Dashboard/MyPlans";
import Security from "../Components/Dashboard/Security";
import AdminTransactions from "../Components/Admin/AdminTransaction";
import Testing from "../Components/Admin/Testing";
import Settings from "../Components/Admin/settings";
import Home from "../Components/TRY/Home";
import AboutPage from "../Components/TRY/AboutPage";
import ContactPage from "../Components/TRY/Contact";
import AuthPage from "../Auth/AuthPage";

export const Router = createBrowserRouter([
  {
    path: "auth",
    element: <AuthPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "user",
    element: <Private element={<Dashboard />}></Private>,
    children: [
      {
        path: "deposit",
        element: <Deposit />,
      },
      {
        path: "transaction",
        element: <Transactions />,
      },
      {
        path: "my-plans",
        element: <MyPlans />,
      },
      {
        path: "withdraw",
        element: <Withdraw />,
      },
      {
        path: "tradingplans",
        element: <TradingPlans />,
      },
      {
        path: "useracct",
        element: <Account />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "security",
            element: <Security />,
          },
        ],
      },
      {
        index: true,
        path: "overview",
        element: <Overview />,
      },
    ],
  },

  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "insights",
        element: <Insights />,
      },
      {
        path: "planning-services",
        element: <Planning />,
      },
      {
        path: "investment",
        element: <Investment />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminPrivate element={<Admin />}></AdminPrivate>,
    children: [
      // {
      //   path : 'users',
      //   element : <Users/>
      // },
      {
        path: "adminTrans",
        element: <AdminTransactions />,
      },
      {
        path: "testing",
        element: <Testing />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
