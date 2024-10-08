import React, { useState } from 'react';
import { FaHome, FaUser, FaCog, FaBars, FaChevronLeft, FaChevronRight   } from 'react-icons/fa';
import LogoutButton from './LogOutButton';

function Sidebar({ isOpen, setIsOpen }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const menuItems = [
    { icon: <FaHome />, label: 'Home' },
    { icon: <FaUser />, label: 'Mi Perfil' },
    { icon: <FaCog />, label: 'Ajustes' },
  ];

  return (
    <div>
      {/* Mobile Hamburger Menu */}
      <div className="md:hidden p-4">
        <button onClick={toggleMobileMenu}>
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
  className={`bg-slate-300 dark:bg-gray-800 text-gray-900 dark:text-white p-4 space-y-4 md:flex flex-col ${
    isMobileOpen ? 'block' : 'hidden md:block'
  } ${isOpen ? 'w-64' : 'w-16'} transition-all duration-300 h-full`}
>
  <button onClick={toggleSidebar} className=" self-end mb-4">
    {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
  </button>

  <div className="flex-grow">
    {menuItems.map((item, index) => (
      <div
        key={index}
        className="flex items-center space-x-4 p-2 hover:bg-gray-700 rounded"
      >
        <div>{item.icon}</div>
        {isOpen && <span>{item.label}</span>}
      </div>
    ))}
  </div>

  <div className="mt-auto">
    <LogoutButton isOpen={isOpen} />
  </div>
</aside>

    </div>
  );
}

export default Sidebar;
