// import { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import RootState from '../../Function/RootState';
// import { CiMenuKebab } from "react-icons/ci";
// import axios from 'axios';
// import { setAllUsers } from '../../Function/Slice';
// import toast from 'react-hot-toast';
// import { Modal, Spin } from 'antd';

// const Users = () => {
//     const users = useSelector((state: RootState) => state.mySlice.allAdminUsers || {});
//     const userData = users ? Object.values(users) : [];
//     const userToken = useSelector((state: RootState) => state.mySlice.token);

//     const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
//     const [deleteLoading, setDeleteLoading] = useState<{ [key: string]: boolean }>({});
//     const [modalVisible, setModalVisible] = useState(false);
//     const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//     const [creditLoading, setCreditLoading] = useState(false);
//     const [openModal, setOpenModal] = useState(false);
//     const [status, setStatus] = useState('');
//     const [amount, setAmount] = useState<number>();
//     const [selectedUserId, setSelectedUserId] = useState<string>("");
//     const dispatch = useDispatch();
//     const [menuIndex, setMenuIndex] = useState<number | null>(null);

//     const handleShowMenu = (index: number) => {
//         setMenuIndex(index);
//     };

//     const handleRequestError = (error: any) => {
//         const errorMsg = error.response ? error.response.data.message : 'An error occurred.';
//         toast.error(errorMsg);
//     };

//     const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (menuIndex !== null && menuRefs.current[menuIndex] && !menuRefs.current[menuIndex]?.contains(event.target as Node)) {
//                 setMenuIndex(null);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [menuIndex]);

//     const getAllUsers = async () => {
//         if (!userToken) return;

//         const url = 'https://express-profit.vercel.app/all-users';
//         const headers = {
//             Authorization: `Bearer ${userToken}`,
//         };
//         try {
//             const response = await axios.get(url, { headers });
//             dispatch(setAllUsers(response.data.data));
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         getAllUsers();
//     }, [userToken]);

//     const handleVerifyUser = async (_id: string) => {
//         if (!userToken) return;

//         const toastLoadingId = toast.loading("Please wait...");
//         try {
//             setLoading((prev) => ({ ...prev, [_id]: true }));
//             const url = `https://express-profit.vercel.app/verify-user/${_id}`;
//             const headers = {
//                 Authorization: `Bearer ${userToken}`,
//             };
//             const data = {};
//             const response = await axios.put(url, data, { headers });
//             dispatch(setAllUsers(response.data.data));
//             toast.success(response.data.message);
//             setModalVisible(true);
//             getAllUsers();
//         } catch (error) {
//             handleRequestError(error);
//         } finally {
//             setLoading((prev) => ({ ...prev, [_id]: false }));
//             toast.dismiss(toastLoadingId);
//         }
//     };

//     const handleDeleteUser = async (_id: string) => {
//         if (!userToken) return;

//         const toastLoadingId = toast.loading('please wait....');
//         try {
//             setDeleteLoading((prev) => ({ ...prev, [_id]: true }));
//             const url = `https://express-profit.vercel.app/delete-user/${_id}`;
//             const headers = {
//                 Authorization: `Bearer ${userToken}`,
//             };
//             const response = await axios.delete(url, { headers });
//             toast.success(response.data.message);
//             getAllUsers();
//         } catch (error) {
//             handleRequestError(error);
//         } finally {
//             setDeleteLoading((prev) => ({ ...prev, [_id]: false }));
//             toast.dismiss(toastLoadingId);
//         }
//     };

//     const handleCreditDebitUser = async (_id: string) => {
//         if (!userToken || !amount || !status) {
//             alert('All fields must be filled and mode must be either credit or debit');
//             return;
//         }

//         const toastLoadingId = toast.loading('Please wait...');
//         try {
//             setCreditLoading(true);
//             const url = `https://express-profit.vercel.app/debitorcredit/${_id}`;
//             const headers = {
//                 Authorization: `Bearer ${userToken}`,
//             };
//             const data = { status, amount };
//             const response = await axios.post(url, data, { headers });
//             dispatch(setAllUsers(response.data.data));
//             toast.success(response.data.message);
//         } catch (error) {
//             handleRequestError(error);
//         } finally {
//             setCreditLoading(false);
//             toast.dismiss(toastLoadingId);
//             setOpenModal(false); // Close the modal after the action
//         }
//     };

//     const handleOpenCreditDebitModal = (userId: string) => {
//         setSelectedUserId(userId);
//         setOpenModal(true);
//     };

//     const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setAmount(Number(e.target.value));
//     };

//     const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setStatus(e.target.value);
//     };

//     return (
//         <>
//             <div className="w-full h-screen flex flex-col gap-2 overflow-y-auto">
//                 <div className="w-max h-10 flex items-center gap-4 justify-between bg-gray-300">
//                     <p className="w-32 h-full flex justify-center items-center">Name</p>
//                     <p className="w-32 h-full flex justify-center items-center">UserName</p>
//                     <p className="w-32 h-full flex justify-center items-center">Account balance</p>
//                     <p className="w-32 h-full flex justify-center items-center">Verify</p>
//                     <p className="w-32 h-full flex justify-center items-center">Date Registered</p>
//                     <p className="w-32 h-full flex justify-center items-center">Action</p>
//                 </div>
//                 <div className="w-max h-max flex flex-col gap-2">
//                     {userData?.map((items, index) => (
//                         <div
//                             className="w-max h-16 flex items-center gap-4 justify-between bg-sky-100 shadow"
//                             key={index}
//                             ref={(el) => (menuRefs.current[index] = el)}
//                         >
//                             <p className="w-32 h-full flex justify-center items-center text-sm">
//                                 {items.fullName}
//                             </p>
//                             <p className="w-32 h-full flex justify-center items-center text-sm">
//                                 {items.userName}
//                             </p>
//                             <p className="w-32 h-full flex justify-center items-center text-sm">
//                                 {items.acctBalance}
//                             </p>
//                             <p className="w-32 h-full flex justify-center items-center text-sm">
//                                 {`${items.isVerified}`}
//                             </p>
//                             <p className="w-32 h-full flex justify-center items-center text-sm">
//                                 {new Date(items?.createdAt).toLocaleDateString()}
//                             </p>
//                             <p className="w-32 h-full flex justify-center items-center text-sm relative">
//                                 <CiMenuKebab
//                                     className="w-6 h-6 cursor-pointer"
//                                     onClick={() => handleShowMenu(index)}
//                                 />
//                                 {menuIndex === index && (
//                                     <div className="absolute top-12 right-[10px] z-10 w-32 h-max flex flex-col bg-orange-100 gap-2 p-2">
//                                         <div
//                                             className="w-full h-8 flex items-center justify-center bg-white cursor-pointer"
//                                             onClick={() => handleOpenCreditDebitModal(items._id)}
//                                         >
//                                             Credit/Debit
//                                             {creditLoading && <Spin />}
//                                         </div>
//                                         <div
//                                             className="w-full h-8 flex items-center justify-center bg-white cursor-pointer"
//                                             // Implement suspend user action here
//                                         >
//                                             Suspend User
//                                         </div>
//                                         <div
//                                             className="w-full h-8 flex items-center justify-center bg-white cursor-pointer"
//                                             onClick={() => handleVerifyUser(items._id)}
//                                         >
//                                             Verify User
//                                             {loading[items._id] && <Spin />}
//                                         </div>
//                                         <div
//                                             className="w-full h-8 flex items-center justify-center bg-white cursor-pointer"
//                                             onClick={() => handleDeleteUser(items._id)}
//                                         >
//                                             Delete User
//                                             {deleteLoading[items._id] && <Spin />}
//                                         </div>
//                                     </div>
//                                 )}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//                 <Modal
//                     title="User Verify Successful"
//                     open={modalVisible}
//                     onOk={() => setModalVisible(false)}
//                     onCancel={() => setModalVisible(false)}
//                 >
//                     User verification was successful!
//                 </Modal>

//                 <Modal
//                     title="User Delete Successful"
//                     open={deleteModalVisible}
//                     onOk={() => setDeleteModalVisible(false)}
//                     onCancel={() => setDeleteModalVisible(false)}
//                 >
//                     User deletion was successful!
//                 </Modal>
//                 <Modal
//                     title="Credit/Debit User"
//                     open={openModal}
//                     onOk={() => handleCreditDebitUser(selectedUserId)}
//                     onCancel={() => setOpenModal(false)}
//                 >
//                     <div className="w-full h-max flex flex-col items-center gap-5">
//                         <div className="w-full h-max text-lg flex flex-col gap-2">
//                             <input
//                                 type="number"
//                                 placeholder="Enter amount"
//                                 value={amount === undefined ? '' : amount.toString()}
//                                 onChange={handleAmountChange}
//                                 className="w-full p-2 border border-gray-300 rounded"
//                             />
//                             <select
//                                 value={status}
//                                 onChange={handleModeChange}
//                                 className="w-full p-2 border border-gray-300 rounded"
//                             >
//                                 <option value="">Select mode</option>
//                                 <option value="Credit">Credit</option>
//                                 <option value="Debit">Debit</option>
//                             </select>
//                         </div>
//                     </div>
//                 </Modal>
//             </div>
//         </>
//     );
// };

// export default Users;
