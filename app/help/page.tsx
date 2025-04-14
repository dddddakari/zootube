"use client";
import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { FaPlay, FaTools, FaBug, FaQuestionCircle, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
 
const HelpPage = () => {
  return (
    <main
      className="min-h-screen bg-no-repeat bg-cover bg-top"
      style={{ backgroundImage: "url('/frog.svg')" }}
    >
      <Header />
      
      <div>
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap gap-2 font-bold">
            <Link href="/" className="flex items-center hover:bg-yellow-400 transition bg-yellow-700 text-white rounded-lg px-4 py-2">
              <FaArrowLeft className="mr-2" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg px-6 py-15">
          <h1 className="text-4xl text-center font-extrabold text-green-700 mb-6">
            Welcome to Zootube Help Center
          </h1>
 
          <section className="mb-8 px-6">
            <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
              <FaQuestionCircle className="text-green-600" />
              How Zootube Works
            </h2>
            <p className="text-lg text-gray-700 mt-4 px-6">
              Zootube is an online platform where you can watch live streams and pre-recorded videos of animals
              from all around the world! Whether you&apos;re interested in watching zoo animals, wildlife, or even
              underwater creatures, Zootube has you covered.
            </p>
            <p className="text-lg text-gray-700 mt-4 px-6">
              To get started, simply browse through our categories or use the search function to find videos that
              interest you. You can watch the streams, discover fun facts, and even share videos with your friends!
            </p>
          </section>
 
          <section className="mb-8 px-6">
            <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
              <FaPlay className="text-green-600" />
              Features
            </h2>
            <ul className="list-disc ml-6 text-lg text-gray-700 mt-4 px-6">
              <li>Watch live and pre-recorded animal streams.</li>
              <li>Explore different animal categories and channels.</li>
              <li>Access fun trivia and interesting facts about the animals.</li>
              <li>Like your favorite streams and save them to your collection.</li>
              <li>Share your favorite videos with friends and family.</li>
            </ul>
          </section>
 
          <section className="mb-8 px-6">
            <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
              <FaTools className="text-green-600" />
              How to Use Zootube
            </h2>
            <p className="text-lg text-gray-700 mt-4 px-6">
              To watch videos on Zootube, simply follow these steps:
            </p>
            <ol className="list-decimal ml-6 text-lg text-gray-700 mt-4 px-6">
              <li>Navigate to the &quot;Videos&quot; or &quot;Live Streams&quot; section.</li>
              <li>Select a video or live stream that interests you.</li>
              <li>Click the &quot;Watch Now&quot; button to start streaming.</li>
              <li>Enjoy the video and explore additional features like trivia and sharing options!</li>
            </ol>
          </section>
 
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2 px-6">
              <FaBug className="text-green-600" />
              Troubleshooting
            </h2>
            <p className="text-lg text-gray-700 mt-4 px-14">
              If you are experiencing issues with the site, here are a few tips to help:
            </p>
            <ul className="list-disc ml-6 text-lg text-gray-700 mt-4 px-12">
              <li>Ensure that your internet connection is stable for smooth streaming.</li>
              <li>If a video won&apos;t load, try refreshing the page or check your internet speed.</li>
              <li>If you&apos;re unable to find a video you&apos;ve already watched, try using the &quot;Recently Watched&quot; tab to find your video!</li>
              <li>If you encounter any bugs or errors, contact support via our &quot;Contact Us&quot; page.</li>
            </ul>
          </section>
        </div>
      </div>
 
      <Footer />
    </main>
  );
};
 
export default HelpPage;