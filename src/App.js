import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "./AuthContext";
import AppCopy from "./App copy"; // นำเข้าไฟล์ App copy.js

import Home from "./Home"; // Create this component for your homepage
const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/App copy.js" element={<AppCopy />} />  {/* เส้นทางสำหรับ App copy */}
          {/* Add other routes as needed */}
        </Routes>
      </AuthContextProvider>
    </Router>
  );
};
export default App;
