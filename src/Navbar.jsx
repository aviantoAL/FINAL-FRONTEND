
import React from "react";
import { Link, useLocation } from "react-router-dom";


const Navbar = ({ userRole, onLogout }) => {
  const location = useLocation();

  return (
    <>
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div>
          <span className="text-white font-bold text-lg">EASYWASTE</span>
        </div>
        <ul className="flex space-x-4 text-white">
          <li>
            <Link to="/home" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </li>
          {userRole === "customer" && (
            <>
              <li>
                <Link to="/customer" className="hover:text-gray-300">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/customer/orders" className="hover:text-gray-300">
                  Orders
                </Link>
              </li>
            </>
          )}
          {userRole === "admin" && (
            <li>
              <Link to="/admin" className="hover:text-gray-300">
                Admin Dashboard
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
