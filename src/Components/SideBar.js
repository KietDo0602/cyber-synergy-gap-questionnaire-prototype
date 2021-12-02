import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './SideBar.css';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [role, setRole] = useState('');
  const saved = localStorage.getItem("user");
  const user = JSON.parse(saved);
  const [userData, setuserData] = useState(user);

  useEffect(() => {
    // const saved = localStorage.getItem("user");
    // const userData = JSON.parse(saved);
    async function fetchRole() {
      if (userData !== null) {
        if(userData.admin === -1) {
          setRole("Unverified User");
        } else if (userData.admin === 0) {
          setRole("Sub User");
        } else if (userData.admin === 1) {
          setRole("Super User");
        } else if (userData.admin === 2) {
          setRole("Accessor");
        } else if (userData.admin === 3) {
          setRole("CMMC Admin");
        } else {
          setRole("No Role");
        }
      }
    }
    fetchRole();
  }, []);

  const showSidebar = () => setSidebar(!sidebar);
  console.log(user);
  
  return (
    <>
      {userData && user.admin !== -1 ? 
      <div className='navbar'>
      <div className='navbar'>
      <Link to='#' className='menu-bars'>
        <MenuIcon fontSize="large" onClick={showSidebar} />
      </Link>
      </div>
      <div className='navbar__title navbar__item'></div>
      <div className='navbar__item'>User: {userData.email} </div>   
      <div className='navbar__item'>Role: {role} </div> 
      </div>
      : null}
      
      {userData && user.admin !== -1 ? 
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav> 
      : null}
    </>
  );
}

export default Navbar;