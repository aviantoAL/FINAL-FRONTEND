import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import BubbleChat from "./BubbleChat";
import Navbar from "./Navbar";
import Modal from "react-modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const openModal = (cardInfo) => {
    setSelectedCard(cardInfo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCard({});
    setModalOpen(false);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "20%",
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <Navbar />
      <div className="p-4 flex-1 overflow-hidden">
        <h1 className="text-3xl font-bold mb-4">
          Selamat Datang di Aplikasi Kami!
        </h1>

        <Slider {...sliderSettings} className="mx-10 max-w-screen-xl">
          {/* Card 1 */}
          <div
            className="p-2 cursor-pointer card-container"
            onClick={() =>
              openModal({
                id: 1,
                description:
                  "The circular economy is a model of production and consumption, which involves sharing, leasing, reusing, repairing, refurbishing and recycling existing materials and products as long as possible. In this way, the life cycle of products is extended...",
                imageUrl: "public/ce032406f8ef8a2e3ccc183d183c4c88.jpg",
              })
            }
          >
            <div className="card-content">
              <img
                src="public/ce032406f8ef8a2e3ccc183d183c4c88.jpg"
                alt="Circular Economy 1"
                className="mb-2 object-cover object-center w-full h-48"
              />
              <p className="text-black-600 mb-4">
                The circular economy is a model of production and consumption, which involves sharing, leasing, reusing, repairing, refurbishing and recycling existing materials and products as long as possible. In this way, the life cycle of products is extended...
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="p-2 cursor-pointer card-container"
            onClick={() =>
              openModal({
                id: 2,
                description:
                  "Tujuan pemilahan sampah yaitu untuk mempermudah pengelolaan sampah selanjutnya. Selain memudahkan pengelolaan sampah selanjutnya, pemilahan sampah organik dan anorganik dapat mengurangi pencemaran udara yang diakibatkan oleh penumpukan sampah yang masih tercampur antara sampah organik dan anorganik...",
                imageUrl: "public/Daur-Ulang.jpg",
              })
            }
          >
            <div className="card-content">
              <img
                src="public/Daur-Ulang.jpg"
                alt="Memisahkan Sampah"
                className="mb-2 object-cover object-center w-full h-48"
              />
              <p className="text-white-600 mb-4">
                Tujuan pemilahan sampah yaitu untuk mempermudah pengelolaan sampah selanjutnya. Selain memudahkan pengelolaan sampah selanjutnya, pemilahan sampah organik dan anorganik dapat mengurangi pencemaran udara yang diakibatkan oleh penumpukan sampah yang masih tercampur antara sampah organik dan anorganik...
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="p-2 cursor-pointer card-container"
            onClick={() =>
              openModal({
                id: 3,
                description:
                  "Ini adalah tujuan pengembangan kedepan yaitu untuk membuat aplikasi yang dapat diunduh melalui playstore.",
                imageUrl: "public/WhatsApp Image 2022-10-22 at 05.35.17.jpeg",
              })
            }
          >
            <div className="card-content">
              <img
                src="public/WhatsApp Image 2022-10-22 at 05.35.17.jpeg"
                alt="Progres Pengembangan kedepan Aplikasi"
                className="mb-2 object-cover object-center w-full h-48"
              />
              <p className="text-black-600 mb-4">
                Ini adalah tujuan pengembangan kedepan yaitu untuk membuat aplikasi yang dapat diunduh melalui playstore.
              </p>
            </div>
          </div>
        </Slider>

        {/* Tombol menuju halaman Login */}
        <Link to="/login">
          <button className=" bg-slate-600 text-white p-2 rounded mt-4">
            Login
          </button>
        </Link>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} className=" bg-white m-10 object-cover object-center p-5">
        {/* Content for the modal */}
        <div className="text-right">
          <FontAwesomeIcon
            icon={faTimes}
            onClick={closeModal}
            className="cursor-pointer"
          />
        </div>
        <div className="modal-content">
          <img
            src={selectedCard.imageUrl}
            alt={`Card ${selectedCard.id}`}
            className=" object-center scale-75 "
          />
          <p className="text-gray-900 mb-4">
            {selectedCard.description}
          </p>
        </div>
      </Modal>

      <BubbleChat />
    </div>
  );
};

export default Home;
