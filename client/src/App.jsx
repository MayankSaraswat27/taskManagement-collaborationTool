import { BrowserRouter, Routes, Route } from "react-router-dom";


import Dashboard from "./pages/Dashboard";
import './index.css';
import './App.css';   


import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
         <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          
            <Route path="dashboard" element={<Dashboard />} />
            
           
           
        

        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
