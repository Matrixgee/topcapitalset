import { useEffect, useState } from "react";
import { FaUserCheck, FaTrashAlt, FaMoneyBillWave } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllUsers } from "../../Function/Slice";
import toast from "react-hot-toast";
import RootState from "../../Function/RootState";

const Testing = () => {
  const users = useSelector(
    (state: RootState) => state.mySlice.allAdminUsers || []
  );
  const userData = users; // Assuming users is already an array
  console.log(userData);

  const userToken = useSelector((state: RootState) => state.mySlice.token);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [deleteLoading, setDeleteLoading] = useState<{
    [key: string]: boolean;
  }>({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>();
  const [status, setStatus] = useState<string>("");
  const [creditLoading, setCreditLoading] = useState(false);

  const dispatch = useDispatch();

  const getAllUsers = async () => {
    if (!userToken) return;
    const url = "https://express-profit.vercel.app/all-users";
    console.log();

    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    try {
      const response = await axios.get(url, { headers });
      dispatch(setAllUsers(response.data.data));
      toast.success("Users fetched successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);

  const handleMenuToggle = (index: number) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleVerifyUser = async (_id: string) => {
    if (!userToken) return;

    const toastLoadingId = toast.loading("Please wait...");
    try {
      setLoading((prev) => ({ ...prev, [_id]: true }));
      const url = `https://express-profit.vercel.app/verify-user/${_id}`;
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      const response = await axios.put(url, {}, { headers });
      dispatch(setAllUsers(response.data.data));
      toast.success(response.data.message);
      getAllUsers();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, [_id]: false }));
      toast.dismiss(toastLoadingId);
    }
  };

  const handleDeleteUser = async (_id: string) => {
    if (!userToken) return;

    const toastLoadingId = toast.loading("Please wait...");
    try {
      setDeleteLoading((prev) => ({ ...prev, [_id]: true }));
      const url = `https://express-profit.vercel.app/delete-user/${_id}`;
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      const response = await axios.delete(url, { headers });
      toast.success(response.data.message);
      getAllUsers();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleteLoading((prev) => ({ ...prev, [_id]: false }));
      toast.dismiss(toastLoadingId);
    }
  };

  const handleCreditDebitUser = async () => {
    if (!userToken || !amount || !status) {
      toast.error(
        "All fields must be filled and mode must be either credit or debit"
      );
      return;
    }

    const toastLoadingId = toast.loading("Please wait...");
    try {
      setCreditLoading(true);
      const url = `https://express-profit.vercel.app/debitorcredit/${selectedUserId}`;
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      const data = { status, amount };
      const response = await axios.post(url, data, { headers });
      dispatch(setAllUsers(response.data.data));
      getAllUsers();
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setCreditLoading(false);
      toast.dismiss(toastLoadingId);
      setOpenModal(false); // Close the modal after the action
    }
  };

  const handleOpenCreditDebitModal = (userId: string) => {
    setSelectedUserId(userId);
    setOpenModal(true);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  return (
    <div className="w-full h-[100vh] flex flex-col overflow-y-auto">
      <div className="w-max h-10 flex items-center gap-4 justify-between bg-gray-300">
        <p className="w-32 h-full flex justify-center items-center">Name</p>
        <p className="w-32 h-full flex justify-center items-center">UserName</p>
        <p className="w-32 h-full flex justify-center items-center">
          Account balance
        </p>
        <p className="w-32 h-full flex justify-center items-center">Verify</p>
        <p className="w-32 h-full flex justify-center items-center">
          Date Registered
        </p>
        <p className="w-32 h-full flex justify-center items-center">Action</p>
      </div>
      <div className="w-max h-max flex flex-col gap-2 p-4">
        {userData.map((user, index) => (
          <div
            key={user._id}
            className="w-full h-16 text-sm flex items-center shadow bg-sky-100 justify-between text-black"
          >
            <p className="w-[8.6rem] h-full flex justify-center items-center">
              {user.fullName}
            </p>
            <p className="w-[8.6rem] h-full flex justify-center items-center">
              {user.userName}
            </p>
            <p className="w-[8.6rem] h-full flex justify-center items-center">
              ${user.acctBalance}
            </p>
            <p className="w-[8.6rem] h-full flex justify-center items-center">
              {user.isVerified ? "Verified" : "Not Verified"}
            </p>
            <p className="w-[8.6rem] h-full flex justify-center items-center">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <div className="w-[8.6rem] h-full flex justify-center items-center relative">
              {openMenuIndex === index ? (
                <div className="absolute right-0 top-0 bg-white w-[10rem] h-[12rem] shadow-md rounded p-2 z-10">
                  <MdOutlineClear
                    onClick={() => handleMenuToggle(index)}
                    className="absolute top-2 right-2 cursor-pointer"
                  />
                  <div className="w-full flex flex-col gap-2 mt-8">
                    <button
                      className={`w-full h-10 flex justify-center items-center rounded transition-colors ${
                        loading[user._id]
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-400 hover:bg-blue-600 text-white"
                      }`}
                      onClick={() => handleVerifyUser(user._id)}
                      disabled={loading[user._id]}
                    >
                      <FaUserCheck className="mr-2" />{" "}
                      {loading[user._id] ? "Verifying..." : "Verify"}
                    </button>
                    <button
                      className="w-full h-10 bg-green-400 text-white flex justify-center items-center rounded hover:bg-green-600 transition-colors"
                      onClick={() => handleOpenCreditDebitModal(user._id)}
                    >
                      <FaMoneyBillWave className="mr-2" /> Credit/Debit
                    </button>
                    <button
                      className={`w-full h-10 flex justify-center items-center rounded transition-colors ${
                        deleteLoading[user._id]
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }`}
                      onClick={() => handleDeleteUser(user._id)}
                      disabled={deleteLoading[user._id]}
                    >
                      <FaTrashAlt className="mr-2" />{" "}
                      {deleteLoading[user._id] ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ) : (
                <CiMenuKebab
                  className="text-2xl cursor-pointer"
                  onClick={() => handleMenuToggle(index)}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <h2 className="text-xl mb-4">Credit/Debit User</h2>
            <div className="mb-4">
              <label htmlFor="amount" className="block mb-2">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                className="w-full border px-2 py-1"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block mb-2">
                Mode
              </label>
              <select
                id="status"
                className="w-full border px-2 py-1"
                value={status}
                onChange={handleModeChange}
              >
                <option value="">Select Mode</option>
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
              <button
                className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors ${
                  creditLoading ? "cursor-not-allowed" : ""
                }`}
                onClick={handleCreditDebitUser}
                disabled={creditLoading}
              >
                {creditLoading ? "Processing..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testing;
