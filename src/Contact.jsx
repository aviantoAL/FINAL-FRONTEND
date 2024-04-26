import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Link to="/home" className="text-blue-500 hover:underline">
            Back
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        {/* Informasi Kontak */}
        <div className="mb-4">
          <p className="text-lg font-semibold">Contact Information:</p>
          <p>Phone: 08563125637</p>
          <p>Instagram: @alvinalvianto7</p>
          <p>Email: alvinalvianto7@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
