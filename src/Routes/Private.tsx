import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RootState from '../Function/RootState';


interface PrivateRouteProps {
  // path: string;
  element: React.ReactNode;
  children?: React.ReactNode;
}

const Private: React.FC<PrivateRouteProps> = ({  element, children }) => {
  const userToken = useSelector((state:RootState) => state.mySlice.token);

  
  
  

  return userToken === '' ? (
    <Navigate to="/login" replace />
  ) : (
    children ? <>{children}</> : <>{element}</>
  );
};

export default Private;