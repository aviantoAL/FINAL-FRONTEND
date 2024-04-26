import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [totalReward, setTotalReward] = useState(0);

  useEffect(() => {
    // Fetch orders from JSON Server
    fetch("http://localhost:3000/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        // Calculate total reward from API response
        const total = data.reduce((acc, order) => acc + order.reward, 0);
        setTotalReward(total);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="p-4">
      <Navbar />
      <div className=" bg-gradient-to-r from-green-500 to-blue-600 min-h-screen">
        <h2 className="text-xl font-semibold mb-5 p-5 ">Order History</h2>
        <p className="text-lg font-semibold mb-2 m-5">
          Total Reward: {totalReward}
        </p>
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded-md m-5">
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold">
                    Waste Type: {order.wasteType}
                  </p>
                  <p>
                    <strong>Weight:</strong> {order.weight} kg,{" "}
                    <strong>Location:</strong> {order.location}
                  </p>
                </div>
                <div>
                  <p className="text-lg">
                    <strong>Reward:</strong> {order.reward}
                  </p>
                  <p
                    className={`text-lg font-bold ${
                      order.status === "Pending"
                        ? "text-red-500"
                        : order.status === "Processed"
                        ? "text-blue-500"
                        : order.status === "Completed"
                        ? "text-yellow-500"
                        : ""
                    }`}
                  >
                    Status: {order.status}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4 p-5">
          <Link to="/customer" className="bg-blue-500 text-white p-2 rounded">
            Back
          </Link>
          <button className="bg-red-500 text-white p-2 rounded ml-2">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
