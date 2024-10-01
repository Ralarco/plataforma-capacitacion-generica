import React, { useState } from 'react'
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import DashboardContent from '../components/DashboardContent';

function Dashboard({ darkMode, setDarkMode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'dark' : ''}`}>
      
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <DashboardContent />
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
