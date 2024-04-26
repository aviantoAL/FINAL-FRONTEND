
import React, { useState } from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BubbleChat = ({ onChatClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChatClick = () => {
    setIsOpen(!isOpen);
    if (onChatClick) {
      onChatClick();
    }
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:alvinalvianto7@gmail.com";
  };

  return (
    <div className="fixed bottom-4 right-4">
      <div
        className="bg-green-500 rounded-full p-3 cursor-pointer text-grey-900"
        onClick={handleEmailClick}
      >
        {/* Font Awesome email icon */}
        <FontAwesomeIcon icon={faEnvelope} size="lg" />
      </div>
    </div>
  );
};

export default BubbleChat;
