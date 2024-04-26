
// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import Login from "./Login";
// import Admin from "./Admin";
// import Customer from "./Customer";
// import Contact from "./contact";
// import Home from "./Home";

// const App = () => {
//   const [userRole, setUserRole] = useState(null);

//   const handleLogin = (role) => {
//     setUserRole(role);
//   };

//   const handleLogout = () => {
//     setUserRole(null);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login onLogin={handleLogin} />} />
//         {userRole === "admin" ? (
//           <Route path="/admin" element={<Admin />} />
//         ) : userRole === "customer" ? (
//           <Route path="/customer" element={<Customer />} />
//         ) : (
//           <Route path="/*" element={<Navigate to="/login" />} />
//         )}
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/Home" element={<Home />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";
import Customer from "./Customer";
import Contact from "./contact";
import Home from "./Home";
import Orders from "./Orders";

const App = () => {
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {userRole === "admin" ? (
          <Route path="/admin" element={<Admin />} />
        ) : userRole === "customer" ? (
          <>
            <Route path="/customer/*" element={<Customer />} />
            <Route path="/customer/orders" element={<Orders />} />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;


