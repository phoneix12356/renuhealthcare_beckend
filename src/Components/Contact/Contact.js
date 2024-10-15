import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactUs = () => {
 
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "081a2add-f083-4d05-ab18-74d7baa4c29a");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      toast.success("Message sent successfully!!");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
    event.target.reset();
  };
  return (
    <>
      <div className="sm:w-11/12 m-auto">
        <ToastContainer />
        {/* Hero Section */}
        <div
          className="relative mb-4 h-52 sm:h-96 md:h-[40rem] flex items-center justify-center w-full bg-cover rounded-lg bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/Contact/contact-hero-1.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>
          <h1 className="relative text-4xl font-semibold text-white drop-shadow-lg">
            Contact Us
          </h1>
        </div>

        {/* Input Form and Location */}
        <div className="contact-section w-full mx-4 sm:mx-12 mt-12 mb-12 flex flex-col md:flex-row md:justify-between lg:flex-row lg:justify-around">
          {/* Contact Form */}
          <div className="contact-input md:w-1/2 md:px-4">
            <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
              Have any questions? We're here to help!
            </h2>
            <form
              onSubmit={onSubmit}
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
              <textarea
                name="message"
                className="mb-4 w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                rows="5"
                placeholder="Your Message"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Location Section */}
          <div className="contact-location md:w-1/2 md:px-4 mt-8 md:mt-0">
            <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
              Our Location
            </h2>
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold">Our Office</h3>
              <p className="text-gray-600">
                1234 Street Name,
                <br />
                City, State, 12345
              </p>
              <p className="text-gray-600">Phone: (123) 456-7890</p>
              <p className="text-gray-600">Email: info@example.com</p>
              <div className="mt-4">
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
