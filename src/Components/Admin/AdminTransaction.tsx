import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { BsEye } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Admintransactionview } from "../../Function/Slice";
import toast from "react-hot-toast";
import { Modal } from "antd";
import RootState from "../../Function/RootState";

const AdminTransactions = () => {
  const dispatch = useDispatch();

  const userToken = useSelector((state: RootState) => state.mySlice.token);
  const AdminTrans = useSelector(
    (state: RootState) => state.mySlice.adminTransactions
  );

  const handleRequestError = (error: any) => {
    const errorMsg = error.response
      ? error.response.data.message
      : "An error occurred.";
    toast.error(errorMsg);
  };

  const GetAllTransactions = async () => {
    const url = "https://express-profit.vercel.app/getalldeposit";
    console.log("https://express-profit.vercel.app/getalldeposit");

    const token = userToken;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(url, { headers });
      dispatch(Admintransactionview(response.data.data));
    } catch (error) {
      handleRequestError(error);
    }
  };

  useEffect(() => {
    GetAllTransactions();
  }, []);

  const openProofOfPayment = (url: any) => {
    window.open(url, "_blank");
  };

  const [showMenu, setShowMenu] = useState(
    Array(AdminTrans?.length || 0).fill(false)
  );
  const menuRefs = useRef<HTMLDivElement[]>(
    Array(AdminTrans?.length || 0).fill(null)
  );
  const [menuIndex, setMenuIndex] = useState<number | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRefs.current &&
      menuRefs.current.every(
        (ref) => ref && !ref.contains(event.target as Node)
      )
    ) {
      setMenuIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [AdminTrans, menuIndex]);

  const [loading, setLoading] = useState<boolean>(false);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedItemId, setselectedItemId] = useState("");

  const handleConfirm = () => {
    console.log("hello world");

    if (!selectedItemId) return;

    const toastLoadingId = toast.loading("Please wait...");
    setLoading(true);
    const url = `https://express-profit.vercel.app/confirmdeposit/${selectedItemId}`;
    const data = {};

    const token = userToken;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(url, data, { headers })
      .then((response) => {
        setLoading(false);
        toast.dismiss(toastLoadingId);
        toast.success(response.data.message);
        setLoading(false);

        GetAllTransactions();

        setOpenConfirm(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.dismiss(toastLoadingId);
        console.log(error);
      });
  };

  const handleDecline = () => {
    const toastLoadingId = toast.loading("Please wait...");
    setLoading(true);
    const url = `https://express-profit.vercel.app/declinedeposit/${selectedItemId}`;
    const data = {};

    const token = userToken;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(url, data, { headers })
      .then((response) => {
        setLoading(false);
        toast.dismiss(toastLoadingId);
        setLoading(false);
        GetAllTransactions();
        toast.success(response.data.message);
      })
      .catch((error) => {
        setLoading(false);
        toast.dismiss(toastLoadingId);
        handleRequestError(error);
      });
  };

  const handleShow = (index: number, item_id: string) => {
    // Close all menus and toggle the clicked one
    const newShowMenu = Array(AdminTrans.length).fill(false);
    newShowMenu[index] = !showMenu[index];
    setShowMenu(newShowMenu);
    setselectedItemId(item_id);
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col gap-2 overflow-y-auto">
        {AdminTrans?.length > 0 ? (
          <>
            <div className="w-full h-max border border-gray-200 bg-white rounded overflow-x-auto">
              <div className="w-max h-10 border-t border-t-gray-300 pl-6 flex gap-4">
                <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
                  Reference
                </div>
                <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
                  Mode
                </div>
                <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
                  User
                </div>
                <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
                  Amount
                </div>
                <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
                  Status
                </div>
                <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
                  Date
                </div>
                <div className="w-[5rem] h-full flex items-center text-xs text-black font-medium">
                  Action
                </div>
                <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
                  Receipt
                </div>
              </div>
              <div className="w-full h-max flex flex-col">
                {AdminTrans.map((item: any, index: number) => (
                  <div
                    className="w-max h-10 phone:h-20 border-t border-t-gray-300 pl-6 flex gap-4"
                    key={index}
                  >
                    <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
                      #{item?._id?.slice(-10).toUpperCase()}
                    </div>
                    <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
                      {item?.type}/{item?.coin}
                    </div>
                    <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
                      {item.user ? item.user.fullName : ""}
                    </div>
                    <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
                      ${item?.amount}
                    </div>
                    <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] ">
                      <p
                        className={`w-max h-max px-3 py-1 phone:py-1 text-white rounded-full flex items-center justify-center ${
                          item?.status === "confirmed"
                            ? "bg-green-400"
                            : item?.status === "pending"
                            ? "bg-yellow-400"
                            : item?.status === "declined"
                            ? "bg-red-400"
                            : ""
                        }`}
                      >
                        {item?.status}
                      </p>
                    </div>
                    <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
                      {new Date(item?.depositDate).toLocaleDateString()}
                    </div>
                    <div className="w-[5rem] h-full flex items-center text-xs text-black font-medium relative">
                      <CiMenuKebab
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => handleShow(index, item?._id)}
                      />
                      {showMenu[index] && (
                        <div className="absolute top-12 right-[10px] z-10 w-32 h-max flex flex-col bg-orange-100 gap-2 p-2">
                          <div
                            className="w-full h-8 flex items-center justify-center bg-white cursor-pointer"
                            onClick={() => setOpenConfirm(true)}
                          >
                            Confirm
                          </div>
                          <div
                            className="w-full h-8 flex items-center justify-center bg-white cursor-pointer"
                            onClick={handleDecline}
                          >
                            Decline
                          </div>
                          {/* <div className="w-full h-8 flex items-center justify-center bg-white cursor-pointer">
                                                        Reject
                                                    </div>
                                                    <div className="w-full h-8 flex items-center justify-center bg-white cursor-pointer">
                                                        Delete
                                                    </div> */}
                        </div>
                      )}
                    </div>
                    <div className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
                      <BsEye
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => openProofOfPayment(item?.image)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-max border border-[#cd9f0c] bg-[#fef7e2] rounded">
              <div className="w-full h-24 flex flex-col items-center justify-center gap-2">
                <p className="text-[#cd9f0c]">No Transaction Recorded Yet</p>
              </div>
            </div>
          </>
        )}
        <Modal
          open={openConfirm}
          onCancel={() => setOpenConfirm(false)}
          cancelButtonProps={{ hidden: true }}
          okButtonProps={{
            hidden: true,
          }}
          closeIcon={true}
        >
          <div className="w-full h-max px-12 phone:px-0 py-5 flex flex-col items-center gap-5">
            <p className="text-[rgb(54,74,79)] text-2xl font-semibold phone:text-xl">
              Confirm Payment
            </p>
            <p>Are you sure you want to confirm this payment?</p>
            <div className="w-max h-max flex gap-6">
              <button
                className="w-max h-max px-6 py-2 bg-[#e14954] text-white rounded text-sm font-semibold"
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading ? "LOADING..." : "CONFIRM"}
              </button>
              <button
                className="w-max h-max px-6 py-2 bg-[#e14954] text-white rounded text-sm font-semibold"
                onClick={() => setOpenConfirm(false)}
                disabled={loading}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AdminTransactions;
