import React, { useContext } from 'react';
import { UserContext } from '../context/userContext'; 
import Navbar from './NavBar';

const DashboardLayout = ({ activeMenu, children }) => {
  const { User } = useContext(UserContext);

  return (
    <div className='font-urbanist'>
      <Navbar activeMenu={activeMenu} />
      {User && <div className="container mx-auto pt-4 pb-4">{children}</div>}
    </div>
  );
};

export default DashboardLayout;
