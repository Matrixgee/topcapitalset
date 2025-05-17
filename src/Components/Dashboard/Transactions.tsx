import {BsEye} from "react-icons/bs";
import {FiPlusCircle} from "react-icons/fi";
import {NavLink} from "react-router-dom";

const Transactions = () => {
    const openProofOfPayment = (url:string) => {
        window.open(url, "_blank");
    };

    return (
        <div className="w-[95%] h-[100%] flex flex-col justify-center overflow-hidden">
            <div className="w-[100%] h-[100%] flex flex-col phone:px-4 py-8 gap-3">
                <p className="text-[white] font-semibold text-2xl phone:text-xl">
                    Transactions
                </p>
                <div className="w-[100%] h-[80%] border border-[#023e8a] rounded scroll scrollbar overflow-y-auto scrollbar-thumb-blue-700 scrollbar-track-blue-100 ">
                    <div className="w-[100%] h-[12%] border-t bg-[white] border-t-gray-300 pl-2 pr-5 flex gap-4 ">
                        {/* Headers */}
                        <div className="w-[10rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">Reference</div>
                        <div className="w-[10rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">Mode</div>
                        <div className="w-[10rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">Amount</div> 
                        <div className="w-[10rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">Status</div>
                        <div className="w-[10rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">Date</div>
                        <div className="w-[10rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">Receipt</div>    
                    </div>
                    <div className="w-[100%] h-[20%] phone:h-20 pl-2  flex gap-4">
                        <div className="w-[10rem] h-full flex items-center text-xs text-[white] font-medium">#TRANSACTIONID1</div>
                        <div className="w-[10rem] h-full flex items-center text-xs text-[white] font-medium">Credit Card</div>
                        <div className="w-[10rem] h-full flex items-center text-xs text-[white] font-medium">$100</div>
                        <div className="w-[10rem] h-full flex items-center text-xs text-[white]">
                            <p className="w-max h-max px-3 py-1 phone:py-1 text-white rounded-full flex items-center justify-center bg-green-400">Confirmed</p>
                        </div>
                        <div className="w-[10rem] h-full flex items-center text-xs text-[white] font-medium">2021-08-01</div>
                        <div className="w-[10rem] h-full flex items-center text-xs text-[white] font-medium">
                            <BsEye className="w-5 h-5 cursor-pointer" onClick={() => openProofOfPayment("someurl.com")}/>
                        </div>
                    </div>
                </div>
                <div className="w-[100%] h-[20%] border border-[#023e8a] rounded">
                    <div className="w-full h-[100%] flex flex-col items-center justify-center gap-2">
                        <p className="text-[#FDFDF7]">You have not made any transactions</p>
                        <NavLink to={"/dash/deposit"}>
                            <button className="w-max h-max flex items-center gap-2 bg-[#FDC500] rounded text-white px-6 py-2 text-sm font-semibold">
                                <FiPlusCircle />
                                Deposit Now
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transactions;
