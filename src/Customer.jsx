import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import OrderForm from "./OrderForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const [isOrdering, setIsOrdering] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [weight, setWeight] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [userRole, setUserRole] = useState("customer");
  const [totalReward, setTotalReward] = useState(0); // New state for total reward
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch chats from JSON Server
    fetch("http://localhost:3000/chats")
      .then((response) => response.json())
      .then((data) => setChatMessages(data));
  }, []);

  const handleOrderNow = () => {
    setIsOrdering(true);
  };

  const handleOrderSubmit = async () => {
    if (!wasteType || !weight || !location || !address) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/orders");
      const existingOrders = await response.json();
      const totalReward = existingOrders.reduce((acc, order) => acc + order.reward, 0);

      const reward = weight * 2000;

      fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wasteType, weight, location, address, reward, status: "Pending" }),
      });

      setTotalReward(totalReward + reward);

      Swal.fire({
        icon: "success",
        title: "Order Submitted",
        text: "Your order has been submitted successfully.",
      });

      fetch("http://localhost:3000/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sender: "You", message: `New order placed: ${wasteType}` }),
      });
    } catch (error) {
      console.error("Error submitting order:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to submit order: ${error.message}`,
      });
    } finally {
      setIsOrdering(false);
    }
  };

  const handleToggleChat = () => {
    setChatVisible(!chatVisible);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      alert("Please enter a message");
      return;
    }

    fetch("http://localhost:3000/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sender: "You", message: newMessage }),
    });

    setChatMessages([...chatMessages, { sender: "You", message: newMessage }]);
    setNewMessage("");

    Swal.fire({
      icon: "success",
      title: "Message Sent",
      text: "Your message has been sent successfully.",
    });
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-500 to-purple-700 text-white">
      <Navbar userRole={userRole} />
      <div className="p-4 flex-1 overflow-hidden">
        <h2 className="text-2xl font-bold mb-4">Customer Dashboard</h2>
        <button
          onClick={handleOrderNow}
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Order Now
        </button>
        {isOrdering && (
          <div className="mt-4">
            <OrderForm onSubmit={handleOrderSubmit} />
          </div>
        )}
        <div className="mt-4">
          <p className="text-lg font-semibold">Welcome to our service!</p>
          <p className="text-gray-900">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            tristique lectus sit amet lacus pharetra hendrerit. Sed ut arcu
            efficitur, fermentum libero eu, imperdiet sem. Suspendisse potenti.
            ...
          </p>
          <button
            className="bg-green-900 text-white p-2 rounded mt-4"
            onClick={handleToggleChat}
          >
            Toggle Chat
          </button>
          {chatVisible && (
            <div className="mt-4">
              <div className="p-4 bg-grey-500 border-t border-l border-gray-300 h-64 overflow-y-auto">
                {chatMessages.map((message, index) => (
                  <div key={index} className="mb-2">
                    <strong className="text-grey-500">{message.sender}:</strong> {message.message}
                  </div>
                ))}
              </div>
              <div className="flex mt-2">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 border p-2 mr-2 text-grey-900"
                  placeholder="Type your message..."
                />
                <button
                  className="p-2 bg-blue-900 text-grey-900"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  Send
                </button>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white m-5 p-2 rounded mt-4"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customer;
