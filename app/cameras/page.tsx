"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaArrowLeft,
  FaQuestionCircle,
  FaShoppingCart,
  FaHistory,
} from "react-icons/fa";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

// what is needed from the video to display on the 'tube' part
interface Video {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
}
// random default thumbnails to use if the video thumbnail fails to load
// (these are not the same as the ones in the videos.json file)
const DEFAULT_THUMBNAILS = [
  "/default-thumbnails/default1.jpg",
  "/default-thumbnails/default2.jpg",
  "/default-thumbnails/default3.jpg",
  "/default-thumbnails/default4.jpg",
  "/default-thumbnails/default5.jpg",
  "/default-thumbnails/default6.jpg",
  "/default-thumbnails/default7.jpg",
  "/default-thumbnails/default8.jpg",
  "/default-thumbnails/default9.jpg",
  "/default-thumbnails/default10.jpg",
  "/default-thumbnails/default11.jpg",
  "/default-thumbnails/default12.jpg",
  "/default-thumbnails/default13.jpg",
  "/default-thumbnails/default14.jpg",
  "/default-thumbnails/default15.jpg",
  "/default-thumbnails/default16.jpg",
  "/default-thumbnails/default17.jpg",
  "/default-thumbnails/default18.jpg",
  "/default-thumbnails/default19.jpg",
  "/default-thumbnails/default20.jpg",
];

// Main component for the Cameras page
// This page fetches and displays a list of animal videos from a JSON file
// It also handles fallback thumbnails for videos that fail to load
// and provides navigation links to other pages in the app
const CamerasPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [fallbackThumbnails, setFallbackThumbnails] = useState<
    Record<string, string>
  >({});


// fetchs the videos from the json file in /public folder
  // and sets the fallback thumbnails for each video
  // done with a useEffect so that it only runs once
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/animalVideos.json");
        const data = await response.json();
        setVideos(data);

        const thumbnails: Record<string, string> = {};
        data.forEach((video: Video) => {
          thumbnails[video.id] =
            DEFAULT_THUMBNAILS[
              Math.floor(Math.random() * DEFAULT_THUMBNAILS.length)
            ];
        });
        setFallbackThumbnails(thumbnails);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  // handles the entire thumbnail image error event for the video thumbnails
// if the thumbnail doesn't load properly, it automatically replaces it with a random thumbnail in the public folder

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement>,
    id: string
  ) => {
    const img = e.target as HTMLImageElement;
    if (fallbackThumbnails[id]) {
      img.src = fallbackThumbnails[id];
      img.onerror = null;
    }
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* Navigation Section - Matches your main page style */}
      <div className="relative lg:flex space-x-10 font-extrabold pl-42 pt-4 py-2">
        <div className="relative lg:flex space-x-1">
          <Link
            href="/"
            className="flex items-center hover:bg-yellow-700 transition bg-green-700 text-white rounded-xl p-2"
          >
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
          <Link
            href="/trivia"
            className="flex items-center hover:bg-yellow-700 transition bg-green-700 text-white rounded-xl p-2"
          >
            <FaQuestionCircle className="mr-2" /> Trivia
          </Link>
          <Link
            href="/merch"
            className="flex items-center hover:bg-yellow-700 transition bg-green-700 text-white rounded-xl p-2"
          >
            <FaShoppingCart className="mr-2" /> Shop
          </Link>
          <Link
            href="/recent"
            className="flex items-center hover:bg-yellow-700 transition bg-green-700 text-white rounded-xl p-2"
          >
            <FaHistory className="mr-2" /> Recently Watched
          </Link>
        </div>
      </div>

      {/* Main Content 
      it displays the videos with the needed formatting and logs their id for later ( needed in the pages) */}
      <div className="container mx-auto px-4 py-8 bg-gray-100">
        <h1 className="text-3xl font-extrabold text-center mb-6">
          Animal Videos
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="relative w-full h-48 bg-gray-200">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover"
                  onError={(e) => handleImageError(e, video.id)}
                  unoptimized={true}
                  priority={false}
                />
                <span className="absolute bottom-0 left-0 right-0 text-white font-bold text-center px-2 bg-black bg-opacity-50">
                  {video.title}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold">{video.title}</h3>

                <Link
                  href={`/videos/${video.id}`}
                  className="text-green-700 hover:text-yellow-700 font-extrabold mt-2 inline-block"
                >
                  Watch Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default CamerasPage;
