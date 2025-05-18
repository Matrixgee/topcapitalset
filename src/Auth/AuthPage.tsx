
import { Outlet } from "react-router-dom";

 const AuthPage = ()=> {
    const colors = {
  primaryBlue: '#304F9C',
  lightBlue: '#E6EFFF',
  coral: '#FF7F6B',
  teal: '#20B2AA',
  gold: '#FFD700',
  darkText: '#212529',
  grayText: '#6C757D'
};

  
  return (
    <div className="flex h-screen w-full justify-center flex-col items-center" style={{ backgroundColor: colors.primaryBlue }}>
      <Outlet/>
    </div>
  );
}
export default AuthPage