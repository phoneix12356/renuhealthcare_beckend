import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Donate = () => {
  const handleDonate = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.example.com/donate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      toast.success("Thank you for your donation!");
    } else {
      toast.error("There was an issue with your donation. Please try again.");
    }
    event.target.reset();
  };

  return (
    <div className="sm:w-11/12 m-auto">
      <ToastContainer />
      {/* Hero Section */}
      <div
        className="relative mb-4 h-52 sm:h-96 md:h-[40rem] flex items-center justify-center w-full bg-cover rounded-lg bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/Donate/donate-hero.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>
        <h1 className="relative text-4xl font-semibold text-white drop-shadow-lg">
          Donate
        </h1>
      </div>

      {/* Donation Form */}
      <div className="my-12 mx-4 sm:mx-12">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Your Contribution Matters
        </h2>
        <form
          onSubmit={handleDonate}
          className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
        >
          <input
            name="name"
            className="mb-4 w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            type="text"
            placeholder="Your Name"
            required
          />
          <input
            name="email"
            className="mb-4 w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="amount"
            className="mb-4 w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            type="number"
            placeholder="Donation Amount"
            required
          />
          <textarea
            name="message"
            className="mb-4 w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            rows="4"
            placeholder="Additional Message (optional)"
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Donate Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donate;
