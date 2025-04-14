"use client";
import React, { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Link from "next/link";
import { FaArrowLeft, FaCamera, FaHistory, FaQuestionCircle, FaShoppingCart } from "react-icons/fa";
 
// basically just a wall of text to be fair,
// but it is a nice wall of text
// and it is a nice page to have in the app
// it leads to ABBA money so very cool
 
 
const DonatePage = () => {
  const [showSuccess, setShowSuccess] = useState(false)
  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div>
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap gap-2 font-bold">
            <Link href="/" className="flex items-center hover:bg-yellow-600 transition bg-green-700 text-white rounded-lg px-4 py-2">
              <FaArrowLeft className="mr-2" /> Back to Home
            </Link>
            <Link href="/cameras" className="flex items-center hover:bg-yellow-600 transition bg-green-700 text-white rounded-lg px-4 py-2">
              <FaCamera className="mr-2" /> Cameras
            </Link>
            <Link href="/trivia" className="flex items-center hover:bg-yellow-600 transition bg-green-700 text-white rounded-lg px-4 py-2">
              <FaQuestionCircle className="mr-2" /> Trivia
            </Link>
            <Link href="/merch" className="flex items-center hover:bg-yellow-600 transition bg-green-700 text-white rounded-lg px-4 py-2">
              <FaShoppingCart className="mr-2" /> Shop
            </Link>
            <Link href="/recent" className="flex items-center hover:bg-yellow-600 transition bg-green-700 text-white rounded-lg px-4 py-2">
              <FaHistory className="mr-2" /> Recently Watched
            </Link>
          </div>
        </div>
      </div>
 
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h1 className="text-4xl font-extrabold text-green-700 mb-6">
            Thank You for Your Generosity!
          </h1>
          <p className="text-xl text-gray-700">
            Thanks for 3 million dollars, user! :)
          </p>
          <p className="text-lg text-gray-500 mt-4">
            Your contribution helps us continue making amazing things happen.
          </p>
          <div className="mt-6">
            <p className="text-md text-gray-600">
              If you&apos;d like to donate more or learn more about where your funds
              go, feel free to reach out to us! We appreciate every bit of support.
            </p>
            <button
              className="mt-4 bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-400 transition duration-300"
              onClick={() => {
              setShowSuccess(true)
              setTimeout(() => {
              window.location.href = "https://youtu.be/ETxmCCsMoD0?si=DM0ZIAiF8jJ8gHXs&t=48"
              }, 3000)
              }}
            >
              Donate?
            </button>
 
            {showSuccess && (
            <p className="mt-4 text-3xl animate-bounce">Thank you! You’re now permanently subscribed to 342 monthly payments of $99.99!</p>
            )}
          </div>
 
        </div>
      </div>
 
      <Footer />
    </main>
  );
};
 
export default DonatePage;