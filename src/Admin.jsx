import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

const Admin = ({ onLogout }) => {
  const [orders, setOrders] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [totalReward, setTotalReward] = useState(0); // Track total reward
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch orders from JSON Server
    fetch("http://localhost:3000/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data));

    // Fetch chats from JSON Server
    fetch("http://localhost:3000/chats")
      .then((response) => response.json())
      .then((data) => setChats(data));
  }, []);

  const handleRespondOrder = async (orderId, status) => {
    try {
      const orderToUpdate = orders.find((order) => order.id === orderId);
      if (!orderToUpdate) {
        throw new Error(`Order with ID ${orderId} not found`);
      }

      const existingOrders = await fetch("http://localhost:3000/orders").then((response) =>
        response.json()
      );

      const updatedOrders = existingOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      );

      const totalReward = updatedOrders.reduce((acc, order) => acc + order.reward, 0);

      const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setOrders(updatedOrders);
      setTotalReward(totalReward + orderToUpdate.reward);

      Swal.fire({
        icon: "success",
        title: "Order Updated",
        text: `Order ${orderId} has been updated to ${status}.`,
      });
    } catch (error) {
      console.error("Error updating order:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to update order: ${error.message}`,
      });
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      alert("Please enter a message");
      return;
    }

    // Save chat message in JSON Server
    fetch("http://localhost:3000/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sender: "Admin", message: newMessage }),
    });

    setChats([...chats, { sender: "Admin", message: newMessage }]);
    setNewMessage("");

    Swal.fire({
      icon: "success",
      title: "Message Sent",
      text: "Your message has been sent successfully.",
    });
  };

  const handleLogout = () => {
    // Implement your logout logic here, for example, clear user session
    // ...

    // Redirect to the login page
    navigate("/login");

    // Call the onLogout callback passed from the parent component
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="p-4 bg-gradient-to-r from-green-300 to-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-white">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded mb-4"
        >
          Logout
        </button>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-white">Orders</h3>
          <ul className="space-y-2">
            {orders.map((order) => (
              <li
                key={order.id}
                className={`p-4 bg-white rounded border ${
                  order.status === "Completed" ? "bg-grey-200" : ""
                }`}
              >
                <span className="font-semibold">Order {order.id}</span> -{" "}
                {order.status}
                {order.status !== "Completed" && (
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => handleRespondOrder(order.id, "Processed")}
                      className="bg-blue-500 text-white p-1 rounded"
                    >
                      Process
                    </button>
                    <button
                      onClick={() => handleRespondOrder(order.id, "Completed")}
                      className="bg-green-500 text-white p-1 rounded"
                    >
                      Complete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">Chat</h3>
          <div className="p-4 bg-white border-t border-l border-gray-300 h-64 overflow-y-auto">
            {chats.map((chat, index) => (
              <div key={index} className="mb-2">
                <strong>{chat.sender}:</strong> {chat.message}
              </div>
            ))}
          </div>
          <div className="flex mt-2">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border p-2 mr-2"
              placeholder="Type your message..."
            />
            <button
              className="p-2 bg-green-500 text-white"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;


