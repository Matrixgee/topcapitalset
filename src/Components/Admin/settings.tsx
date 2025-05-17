/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { setwalletAddress } from "../../Function/Slice";
import RootState from "../../Function/RootState";

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletType, setWalletType] = useState("btc");
  const [image, setImage] = useState<string | null>(null);
  const [allAddresses, setAllAddresses] = useState([]);

  const dispatch = useDispatch();
  const userToken = useSelector((state: RootState) => state.mySlice.token);

  const headers = {
    Authorization: `Bearer ${userToken}`,
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleQrCodeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRequestError = (error: any) => {
    const errorMsg = error.response
      ? error.response.data.message
      : "An error occurred.";
    toast.error(errorMsg);
  };

  const uploadWallet = async () => {
    const toastLoadingId = toast.loading("Uploading Wallet Address...");
    try {
      const formData = new FormData();
      formData.append("walletAdd", walletAddress);
      formData.append("walletType", walletType);
      if (image) {
        const file = await fetch(image)
          .then((res) => res.blob())
          .then((blob) => new File([blob], "qrCode.png", { type: blob.type }));
        formData.append("image", file);
      }

      const response = await axios.post(
        "https://express-profit.vercel.app/add-wallet",
        formData,
        { headers }
      );

      dispatch(setwalletAddress(response.data.data));
      toast.success("Wallet Address Updated Successfully!");
      toggleModal();
      fetchWalletAddresses();
    } catch (error) {
      handleRequestError(error);
    } finally {
      toast.dismiss(toastLoadingId);
    }
  };

  const fetchWalletAddresses = async () => {
    const toastLoadingId = toast.loading("Fetching Wallet Addresses...");
    try {
      const response = await axios.get(
        "https://express-profit.vercel.app/get-all-wallet",
        { headers }
      );
      setAllAddresses(response.data.data);
      toast.success("Wallet Addresses Fetched Successfully!");
    } catch (error) {
      handleRequestError(error);
    } finally {
      toast.dismiss(toastLoadingId);
    }
  };

  const deleteWallet = async (id: string) => {
    const toastLoadingId = toast.loading("Deleting Wallet Address...");
    try {
      await axios.delete(
        `https://express-profit.vercel.app/delete-wallet/${id}`,
        {
          headers,
        }
      );
      toast.success("Wallet Address Deleted Successfully!");
      fetchWalletAddresses(); // Refresh wallet list
    } catch (error) {
      handleRequestError(error);
    } finally {
      toast.dismiss(toastLoadingId);
    }
  };

  useEffect(() => {
    fetchWalletAddresses(); // Fetch wallet addresses on component mount
  }, []);

  return (
    <div className="w-full h-[100vh] p-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Wallet Settings
        </h1>
        <button
          onClick={toggleModal}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
        >
          Update Wallet
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Saved Wallet Addresses
        </h2>
        {allAddresses.length === 0 ? (
          <>
            <p className="text-gray-600">No wallet addresses available.</p>
            <button
              onClick={toggleModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
            >
              Upload Wallet
            </button>
          </>
        ) : (
          <ul className="space-y-4 w-full ">
            {allAddresses.map((address: any, index: number) => (
              <li
                key={index}
                className="w-[90%] h-[30%] phone:w-full flex px-3 bg-gray-100  justify-center items-center"
              >
                <div>
                  <p className="phone:text-xs">
                    <span className="font-semibold">
                      {address.walletType.toUpperCase()}:
                    </span>{" "}
                    {address.walletAdd}
                  </p>
                  {address.image && (
                    <img
                      src={address.image}
                      alt={`${address.walletType} QR Code`}
                      className="w-20 h-20 mt-2"
                    />
                  )}
                </div>
                <button
                  onClick={() => deleteWallet(address._id)}
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Wallet Details
            </h2>

            {/* Wallet Address Input */}
            <div className="mb-4">
              <label
                htmlFor="walletAddress"
                className="block text-gray-600 font-medium mb-2"
              >
                Wallet Address
              </label>
              <input
                id="walletAddress"
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter Wallet Address"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* QR Code Upload */}
            <div className="mb-4">
              <label
                htmlFor="qrCodeUpload"
                className="block text-gray-600 font-medium mb-2"
              >
                Upload QR Code
              </label>
              <input
                id="qrCodeUpload"
                type="file"
                accept="image/*"
                onChange={handleQrCodeUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Display QR Code */}
            {image && (
              <div className="mb-4 flex justify-center">
                <img
                  src={image}
                  alt="QR Code"
                  className="w-32 h-32 border border-gray-200 rounded"
                />
              </div>
            )}

            {/* Cryptocurrency Selection */}
            <div className="mb-4">
              <label
                htmlFor="cryptoSelect"
                className="block text-gray-600 font-medium mb-2"
              >
                Select Cryptocurrency
              </label>
              <select
                id="cryptoSelect"
                value={walletType}
                onChange={(e) => setWalletType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="btc">Bitcoin</option>
                <option value="eth">Ethereum</option>
              </select>
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={uploadWallet}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
              >
                Upload
              </button>
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
