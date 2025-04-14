"use client";
import React from "react";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

// Wall of text for the welcome page
// This page is displayed when the user first signs up
// It is supposed to be a friendly welcome page with a lot of information about the app
// and what to do next

const WelcomePage = () => {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-4xl font-extrabold text-green-700 mb-6">
            Welcome to Zootube, New User!
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            Thank you for signing up! We&apos;re excited to have you as part of the Zootube community.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            Zootube is your one-stop platform for exploring live streams and videos of animals from around the world.
            From exotic wildlife to zoo favorites, we have it all. Whether you&apos;re interested in watching a tiger hunt or a panda munching on bamboo, you&apos;re in the right place!
          </p>
          
          <section className="mt-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              What to Do Next:
            </h2>
            <ul className="list-disc ml-6 text-lg text-gray-700">
              <li>Browse through our animal categories and discover your favorites.</li>
              <li>Start watching live streams of your favorite animals!</li>
              <li>Don&apos;t forget to check out trivia and fun facts about the animals you watch.</li>
              <li>Like and save your favorite streams to come back to later.</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Ready to Explore?
            </h2>
            <p className="text-lg text-gray-700 mt-4">
              Click the button below to start exploring the world of animals on Zootube!
            </p>
            <div className="mt-6">
              <Link
                href="/cameras"
                className="inline-block bg-green-700 text-white px-6 py-3 rounded-xl text-xl font-semibold hover:bg-yellow-700 transition"
              >
                Start Watching Now
              </Link>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default WelcomePage;
