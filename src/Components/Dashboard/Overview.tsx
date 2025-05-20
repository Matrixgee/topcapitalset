import { Link, NavLink } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LuWallet } from "react-icons/lu";
import { PiWarningCircleLight } from "react-icons/pi";
import { BsCurrencyDollar } from "react-icons/bs";
import TradingWidgetThree from "../TradingWidgetThree";
// import TradingViewWidgetOne from "../TradeOne";
import { useSelector } from "react-redux";
import RootState from "../../Function/RootState";
import { useEffect, useState } from "react";
// import TradingViewWidgettwo from "../TradinViewTwo";
import { MdOutlineAccountBalance } from "react-icons/md";
import Transactions from "./Transactions";

import axios from "axios";

const Overview = () => {
  const user = useSelector((state: RootState) => state.mySlice.tradeUser);
  const [ExchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    const Fetchdata = async () => {
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        const rate = response.data.bpi.USD.rate.replace(",", "");
        setExchangeRate(parseFloat(rate));
      } catch (error) {
        console.log("error getting data ");
      }
    };
    Fetchdata();
  }, []);

  const totalRate = user.acctBalance / ExchangeRate;

  return (
    <div className="w-[100%] h-[85vh] bg-[#14141b]  scroll scrollbar scrollbar-track-grey-500 overflow-y-scroll mt-3 ">
      <div className="w-[100%] h-[20%] flex justify-around phone:pr-3">
        <section className="w-[auto] h-[100%]  flex gap-[3px] justify-center items-start flex-col px-4 phone:w-[30%] phone:pl-5 smallPhone:hidden ">
          <p className="text-[15px] text-[whitesmoke]">Welcome onboard,</p>
          <h3 className="font-semibold text-2xl text-[#fff] phone:text-sm">
            {user?.userName}
          </h3>
          <p className="font-medium text-[14px] text-[whitesmoke] phone:hidden">
            At a glance, your account summary
          </p>
        </section>
        <section className="w-[40%] h-[100%] flex justify-center gap-[15px] items-center phone:w-[60%] phone:gap-[0px] smallPhone:w-[90%] phone:justify-between ">
          <button className="w-[30%] h-[40%] bg-[#FDC500] rounded-md phone:w-[45%] ">
            <NavLink
              to="/user/deposit"
              className="flex justify-center items-center gap-[5px]"
            >
              <IoIosAddCircleOutline className="text-[#FDFDF7]" />{" "}
              <p className="text-[#FDFDF7] font-semibold">Deposit</p>
            </NavLink>
          </button>
          <button className="w-[30%] h-[40%] bg-[#023e8a] rounded-md phone:w-[45%] ">
            <Link
              to="/user/my-plans"
              className="flex justify-center items-center gap-[5px]"
            >
              <LuWallet className="text-[#FDFDF7]" />{" "}
              <p className="text-[#FDFDF7] font-semibold">My Plans</p>
            </Link>
          </button>
        </section>
      </div>
      <section className="w-[100%] h-[40%] flex justify-around pl-4  items-center phone:flex-col mt-5 phone:pr-3 phone:h-[60%] phone:gap-[20px] ">
        <div className="w-[40%] h-[70%] bg-[#023e8a] flex flex-row rounded-md shadow-lg phone:w-[95%] pl-4 gap-[5px] phone:justify-between phone:h-[75%] smallPhone:flex-col ">
          <div className="w-[30%] h-[100%] flex justify-center flex-col phone:w-[40%] smallPhone:w-[100%] smallPhone:gap-[5px] smallPhone:pt-2 ">
            <div className="w-[60%] h-[50%] bg-[#fff] rounded-full flex justify-center items-center phone:w-[45%] phone:h-[40%] smallPhone:h-[53%] smallPhone:w-[15%]  ">
              <MdOutlineAccountBalance className="w-10 h-10 phone:w-8 smallPhone:w-6" />
            </div>
            <div className="w-[100%] h-[20%] flex gap-[5px] items-center">
              <p className=" font-medium text-xs text-[#fff]">
                Available Balance
              </p>
              <PiWarningCircleLight className="text-[white] " />
            </div>
          </div>
          <div className="w-[70%] h-[100%] flex flex-col justify-center gap-[10px] phone:w-[60%] smallPhone:w-[100%] ">
            <div className="w-[auto] h-[auto]  flex justify-start  items-center">
              <BsCurrencyDollar className=" font-semibold text-3xl text-[white] phone:text-2xl " />{" "}
              <p className="font-semibold text-2xl text-[white]">
                {user.acctBalance}.00
              </p>
            </div>
            <div className=" w-auto h-[auto] flex justify-center items-center">
              <p className="text-green-500  text-xl phone:text-lg">
                {" "}
                {totalRate} BTC
              </p>
            </div>
          </div>
        </div>
        <div className="w-[40%] h-[80%]  phone:w-[90%] flex items-center">
          <TradingWidgetThree />
        </div>
      </section>
      <section className=" w-[100%] h-[500px] flex justify-center items-center">
        <div className="w-[95%] h-[100%] ">
          <Transactions />
        </div>
      </section>
    </div>
  );
};

export default Overview;
