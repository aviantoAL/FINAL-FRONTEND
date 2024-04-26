import React, { useState } from "react";
import Swal from "sweetalert2";

const OrderForm = () => {
  const [wasteType, setWasteType] = useState("");
  const [weight, setWeight] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");

  const handleFileChange = (e) => {
    
  };

  const handleOrderSubmit = () => {
   
    if (!wasteType || !weight || !location || !address) {
      alert("Please fill in all fields");
      return;
    }

    const reward = weight * 2000;

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wasteType,
        weight,
        location,
        address,
        reward,
        status: "Pending",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        
        console.log("Order Submitted:", data);

        
        Swal.fire({
          icon: "success",
          title: "Order Submitted",
          text: "Your order has been submitted successfully.",
        });
      })
      .catch((error) => {
        
        console.error("Error submitting order:", error);
      });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Order Form</h2>
      <label className="block mb-2 text-black">
        Waste Type:
        <select
          value={wasteType}
          onChange={(e) => setWasteType(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="" disabled>Select Waste Type</option>
          <option value="Plastic">Plastic</option>
          <option value="Organic">Organic</option>
          <option value="Electronic">Electronic</option>
        </select>
      </label>
      <label className="block mb-2 text-black">
        Estimated Weight (kg):
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border p-2 w-full"
        />
      </label>
      <label className="block mb-2 text-black">
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full"
        />
      </label>
      <label className="block mb-2 text-black">
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 w-full"
        />
      </label>
      <label className="block mb-2 text-black">
        Photo of Waste:
        <input type="file" onChange={handleFileChange} className="mt-2" />
      </label>
      <button
        onClick={handleOrderSubmit}
        className="bg-blue-900 text-white p-2 rounded"
      >
        Submit Order
      </button>
    </div>
  );
};

export default OrderForm;
