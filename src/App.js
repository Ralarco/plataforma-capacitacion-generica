import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import { UserProvider } from "./contexts/UserDataContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState("John Doe");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <UserProvider>
    <BrowserRouter>
      <Header
        isLoggedIn={isLoggedIn}
        username={username}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Routes>
        <Route
          path="/"
          element={<Login darkMode={darkMode} setDarkMode={setDarkMode} />}
        ></Route>
        <Route
          path="/dashboard"
          element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />}
        ></Route>
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
