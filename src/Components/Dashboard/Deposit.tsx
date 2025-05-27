/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaBtc, FaEthereum } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";

import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
// import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import RootState from "../../Function/RootState";

const Deposit = () => {
  // const user = useSelector(
  //     (state: RootState) => state.mySlice.tradeUser
  // );
  const userToken = useSelector((state: RootState) => state.mySlice.token);
  const [btc, setBtc] = useState<boolean>(false);
  const [eth, setEth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isBtcPay, setIsBtcPay] = useState<boolean>(false);
  const [isEthPay, setIsEthPay] = useState<boolean>(false);
  const [direct, setDirect] = useState<boolean>(false);
  const [isPayed, setIsPayed] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [coin, setCoin] = useState<string>("");
  const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  interface WalletData {
    walletAdd: string;
    image: string;
  }

  const [walletData, setwalletData] = useState<WalletData | null>(null);

  // const handleSelectBtc = () => {
  //   setBtc(true);
  //   setEth(false);
  //   setIsEthPay(false);
  //   setIsBtcPay(true);
  // };
  // const handleSelectEth = () => {
  //   setBtc(false);
  //   setEth(true);
  //   setIsEthPay(true);
  //   setIsBtcPay(false);
  // };

  const handleRequestError = (error: any) => {
    const errorMsg = error.response
      ? error.response.data.message
      : "An error occurred.";
    toast.error(errorMsg);
  };

  const handleProceed = () => {
    if (!/^[0-9]+$/.test(amount)) {
      alert("Amount must be a number only");
    } else if (!amount && !btc) {
      alert("Please select a mode and enter the amount to deposit!");
    } else if (!amount && !eth) {
      alert("Please select a mode and enter the amount to deposit!");
    } else {
      setDirect(true);
    }
  };
  const handleBack = () => {
    setDirect(!direct);
    setAmount("");
    setBtc(false);
    setEth(false);
    setIsEthPay(false);
    setIsBtcPay(false);
    if (fileInput) {
      // Reset the file input value
      fileInput.value = "";
    }
  };

  const [selectedFileName, setSelectedFileName] =
    useState<string>("Click to select");
  // const [files, setFile] = useState<any>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];
    if (files) {
      setSelectedFile(files); // Update the file state with the selected file
      setSelectedFileName(files.name); // Update the file name for display
      console.log("Selected file:", files); // Log the selected file for debugging
    } else {
      console.log("No file selected."); // Log if no file is selected
    }
  };

  const handleIsPayed = () => {
    setIsPayed(true);
    if (btc === true) {
      setCoin("BTC");
    } else {
      setCoin("ETH");
    }
  };

  const handleSubmit = () => {
    const toastLoadingId = toast.loading("Please wait...");
    setLoading(true);
    // console.log(amount);
    const formdata = new FormData();
    formdata.append("coin", coin);
    formdata.append("amount", amount);
    if (selectedFile) {
      formdata.append("image", selectedFile);
    }
    formdata.append("status", "pending");
    // console.log("Here's",data);

    const url = "https://express-profit.onrender.com/deposit";
    const token = userToken;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // Make sure to set the correct content type
    };
    // console.log("Data to post:", data);
    axios
      .post(url, formdata, { headers })
      .then((response) => {
        toast.dismiss(toastLoadingId);

        const successMessage =
          response.data.message || "Deposit pending, awaiting confirmation.";
        toast.success(successMessage, { duration: 3000 });
        setLoading(false);
        setDirect(false);
        setAmount("");
        setBtc(false);
        setEth(false);
        setIsEthPay(false);
        setIsBtcPay(false);
        setSelectedFile(null);
        setSelectedFileName("Click to select");
        setIsPayed(false);
      })
      .catch((error) => {
        toast.dismiss(toastLoadingId);
        toast.error("Error Occured please try again or contact admin");
        handleRequestError(error);
        setLoading(false);
      });
  };

  const floatVariable: number = parseFloat(amount);

  const [exchangeRateBTC, setExchangeRateBTC] = useState(0);
  const [exchangeRateUsd, setExchangeRateUsd] = useState(0);
  // console.log(exchangeRateBTC);
  useEffect(() => {
    const url2 = "https://api.coindesk.com/v1/bpi/currentprice.json";
    // Fetch the current exchange rate from an API (replace with a reliable API)
    axios
      .get(url2)
      .then((response) => {
        // console.log("BTC:", response);
        const rate = response.data.bpi.USD.rate.replace(",", ""); // assuming USD rate
        setExchangeRateBTC(parseFloat(rate));
      })
      .catch((error) => {
        console.error("Error fetching exchange rate:", error);
      });

    //exchange rate from 1BTC to USD
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data) => {
        const btcToUsdExchangeRate = data.bitcoin.usd;
        // console.log(
        //     `Exchange rate of 1 BTC to USD: ${btcToUsdExchangeRate}`
        // );
        setExchangeRateUsd(btcToUsdExchangeRate);
      })
      .catch((error) => console.error("Error fetching exchange rate:", error));
  }, [amount]);

  const totalBtc = floatVariable / exchangeRateBTC;
  const roundedTotalBtc = parseFloat(totalBtc.toFixed(8));

  const handleCopyToClipboard = (address: any) => {
    navigator.clipboard.writeText(address);
    toast.success("copied to clipboard");
  };
  const handleCopyToClipboardBtc = (address: any) => {
    navigator.clipboard.writeText(address);
    toast.success("copied to clipboard");
  };

  const handleSelectBtc = async (type: string) => {
    setBtc(true);
    setEth(false);
    setIsEthPay(false);
    setIsBtcPay(true);
    const toastLoadingId = toast.loading("Fetching BTC wallet address...");

    // Fetch the BTC wallet address based on ID
    try {
      const token = userToken;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.get(
        `https://express-profit.onrender.com/user-get-one-wallet/${type}`, // Replace `walletId` with actual ID
        { headers }
      );
      const walletAddress = response.data.data?.walletAdd || "Not available";
      setwalletData(response.data.data); // Update state with wallet data
      toast.success("BTC Wallet Address fetched successfully!");
      console.log("BTC Wallet Data:", response.data.data);
      handleCopyToClipboard(walletAddress);
    } catch (error) {
      toast.error("Failed to fetch BTC wallet address.");
      handleRequestError(error);
    } finally {
      toast.dismiss(toastLoadingId);
    }
  };

  const handleSelectEth = async (type: string) => {
    setBtc(false);
    setEth(true);
    setIsEthPay(true);
    setIsBtcPay(false);
    const toastLoadingId = toast.loading("Fetching ETH wallet address...");

    // Fetch the ETH wallet address based on ID
    try {
      const token = userToken;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.get(
        `https://express-profit.onrender.com/user-get-one-wallet/${type}`, // Replace `walletId` with actual ID
        { headers }
      );

      const walletAddress = response.data.data?.walletAdd || "Not available";
      setwalletData(response.data.data);
      toast.success("ETH Wallet Address fetched successfully!");
      console.log("ETH Wallet Data:", response.data.data);

      console.log("ETH Wallet Address:", walletAddress);
      handleCopyToClipboard(walletAddress);
    } catch (error) {
      toast.error("Failed to fetch ETH wallet address.");
      handleRequestError(error);
    } finally {
      toast.dismiss(toastLoadingId);
    }
  };

  return (
    <>
      <div className="w-full h-max max-md:h-full max-md:overflow-y-scroll">
        <div className="w-full h-max flex flex-col items-center px-10 max-md:px-4 py-8 gap-3">
          {direct === true && isBtcPay === true ? (
            <>
              <div className="text-xl font-semibold text-[rgb(54,74,99)] w-full h-max flex items-center gap-1 ">
                <span
                  className="w-max h-max flex items-center hover:bg-gray-200 transition-all duration-300 cursor-pointer px-2"
                  onClick={handleBack}
                >
                  <IoMdArrowRoundBack />
                  Back
                </span>
              </div>
              <div className="w-[50%] max-md:w-full h-max flex flex-col items-center gap-8 bg-white py-6 px-8">
                <p className="text-[rgb(54,74,99)] font-semibold text-center text-lg">
                  Transaction details
                </p>
                <p className="text-[rgb(82,100,132)] font-medium text-center text-base">
                  You are about to pay {roundedTotalBtc} BTC for {amount}.00
                  USD*
                </p>
                <p className="text-[rgb(128,148,174)] text-center text-xs">
                  Exchange rate: 1 BTC = {exchangeRateUsd} USD
                </p>
                <div className="w-max h-10 flex items-center justify-center bg-[#e5e9f2] px-4 rounded cursor-pointer">
                  <p
                    className="w-max flex items-center gap-2 text-sm font-semibold"
                    onClick={() =>
                      handleCopyToClipboardBtc(walletData?.walletAdd)
                    }
                  >
                    {walletData?.walletAdd}
                    <span>
                      <IoCopyOutline />
                    </span>
                  </p>
                </div>
                <div className="w-48 h-48 flex items-center justify-center">
                  <img src={walletData?.image} alt="" className="" />
                </div>
                {isPayed ? (
                  <div className="w-full h-max flex flex-col mt-10 gap-10">
                    <div className="w-full h-24 border border-[rgb(205,159,12)] bg-[#fef7e2] rounded flex flex-col items-center justify-center gap-1">
                      <p className="text-sm text-[rgb(205,159,12)]">
                        {" "}
                        Attach your proof of payment below.
                      </p>
                      <p className="text-sm text-[rgb(205,159,12)] font-medium">
                        {" "}
                        Accepted format: .JPG, .PNG, .GIF, .PDF
                      </p>
                    </div>
                    <div className="w-full h-10 border border-gray-300 rounded flex">
                      <input
                        type="file"
                        accept="image/jpeg, image/png, image/gif, application/pdf"
                        className="hidden"
                        onChange={handleFileChange}
                        ref={(input) => setFileInput(input)}
                        id="fileInput"
                      />
                      <label
                        className="cursor-pointer w-full h-full border-none outline-none flex justify-center items-center bg-gray-200 rounded"
                        htmlFor="fileInput"
                      >
                        <div className="w-max px-2 flex items-center justify-center h-full">
                          {selectedFileName}
                        </div>
                      </label>
                    </div>
                  </div>
                ) : null}
                {isPayed ? (
                  <button
                    className="w-max h-max rounded text-white text-base font-semibold py-2 px-6 bg-yellow-500"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Submit"}
                  </button>
                ) : (
                  <button
                    className="w-max h-max rounded text-white text-base font-semibold py-2 px-6 bg-yellow-500"
                    onClick={handleIsPayed}
                  >
                    I have sent the coin
                  </button>
                )}
              </div>
            </>
          ) : direct === true && isEthPay === true ? (
            <>
              <div className="text-xl font-semibold text-[rgb(54,74,99)] w-full h-max flex items-center gap-1 ">
                <span
                  className="w-max h-max flex items-center hover:bg-gray-200 transition-all duration-300 cursor-pointer px-2"
                  onClick={handleBack}
                >
                  <IoMdArrowRoundBack />
                  Back
                </span>
              </div>
              <div className="w-[50%] max-md:w-full h-max flex flex-col items-center gap-8 bg-white py-6 px-8">
                <p className="text-[rgb(54,74,99)] font-semibold text-center text-lg">
                  Transaction details
                </p>
                <p className="text-[rgb(82,100,132)] font-medium text-center text-base">
                  You are about to pay 0.004445 ETH for {amount}.00 USD*
                </p>
                <p className="text-[rgb(128,148,174)] text-center text-xs">
                  Exchange rate: 1 ETH = 44,998.00 USD
                </p>
                <div className="w-max h-10 flex items-center justify-center bg-[#e5e9f2] px-4 rounded cursor-pointer">
                  <p
                    className="w-max flex items-center gap-2 text-sm font-semibold"
                    onClick={() => handleCopyToClipboard(walletData?.walletAdd)}
                  >
                    {walletData?.walletAdd}
                    <span>
                      <IoCopyOutline />
                    </span>
                  </p>
                </div>
                <div className="w-48 h-48 flex items-center justify-center">
                  <img src={walletData?.image} alt="" className="" />
                </div>
                {isPayed ? (
                  <div className="w-full h-max flex flex-col mt-10 gap-10">
                    <div className="w-full h-24 border border-[rgb(205,159,12)] bg-[#fef7e2] rounded flex flex-col items-center justify-center gap-1">
                      <p className="text-sm text-[rgb(205,159,12)]">
                        {" "}
                        Attach your proof of payment below.
                      </p>
                      <p className="text-sm text-[rgb(205,159,12)] font-medium">
                        {" "}
                        Accepted format: .JPG, .PNG, .GIF, .PDF
                      </p>
                    </div>
                    <div className="w-full h-10 border border-gray-300 rounded flex">
                      <input
                        type="file"
                        accept="image/jpeg, image/png, image/gif, application/pdf"
                        className="hidden"
                        onChange={handleFileChange}
                        ref={(input) => setFileInput(input)}
                        id="fileInput"
                      />
                      <label
                        className="cursor-pointer w-full h-full border-none outline-none flex justify-center items-center bg-gray-200 rounded"
                        htmlFor="fileInput"
                      >
                        <div className="w-max px-2 flex items-center justify-center h-full">
                          {selectedFileName}
                        </div>
                      </label>
                    </div>
                  </div>
                ) : null}
                {isPayed ? (
                  <button
                    className="w-max h-max rounded text-white text-base font-semibold py-2 px-6 bg-yellow-500"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    className="w-max h-max rounded text-white text-base font-semibold py-2 px-6 bg-yellow-500"
                    onClick={handleIsPayed}
                  >
                    I have sent the coin
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="w-[50%] max-md:w-full h-max flex flex-col gap-8">
                <p className="text-[#FDFDF7] text-4xl text-center max-md:text-lg ">
                  Add funds to your balance!
                </p>
                <div className="w-full h-max flex flex-col gap-2">
                  <p className="text-[#FDFDF7] text-sm font-medium max-md:text-xs">
                    Amount to Deposit <span>USD</span>
                  </p>
                  <input
                    type="text"
                    className="w-full h-16 border border-gray-300 rounded pl-3 outline-1 outline-[#0238ea] max-md:h-12"
                    placeholder="500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <p className="text-[rgb(128,148,174)] text-xs flex justify-between items-center">
                    Minimum: 50.00 USD
                  </p>
                </div>
                <div className="w-full h-max flex flex-col gap-2 ">
                  <p className="text-[#FDFDF7] text-sm font-medium pb-3">
                    Amount to Deposit <span>USD</span>
                  </p>
                  <div className="w-full h-16 border border-b-0 border-gray-300 rounded-t px-4 flex items-center justify-between bg-white max-md:h-12">
                    <div className="w-max h-max flex items-center gap-4 ">
                      <input
                        type="checkbox"
                        className="w-6 h-6 rounded-full"
                        placeholder="500"
                        checked={btc}
                        onClick={() => handleSelectBtc("btc")}
                      />
                      <p className="text-sm text-[rgb(54,74,99)] font-medium">
                        Bitcoin
                      </p>
                    </div>
                    <span className="w-6 h-6 p-2 rounded-full bg-[#8094ae] flex items-center justify-center text-white">
                      <FaBtc />
                    </span>
                  </div>
                  <div className="w-full h-16 border border-gray-300 rounded-t px-4 flex items-center justify-between bg-white max-md:h-12">
                    <div className="w-max h-max flex items-center gap-4 ">
                      <input
                        type="checkbox"
                        className="w-6 h-6 rounded-full"
                        placeholder="500"
                        checked={eth}
                        onClick={() => handleSelectEth("eth")}
                      />
                      <p className="text-sm text-[rgb(54,74,99)] font-medium">
                        Ethereum
                      </p>
                    </div>
                    <span className="w-6 h-6 p-2 rounded-full bg-[#8094ae] flex items-center justify-center text-white">
                      <FaEthereum />
                    </span>
                  </div>
                </div>
                <button
                  className="w-full h-max rounded text-white text-base font-semibold py-2 bg-[#023e8a]"
                  onClick={handleProceed}
                >
                  CONTINUE
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Deposit;
