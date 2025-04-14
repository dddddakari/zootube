"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaArrowLeft,
  FaCamera,
  FaQuestionCircle,
  FaShoppingCart,
} from "react-icons/fa";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

interface Video {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
}

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
];

const RecentlyWatchedPage = () => {
  const [recentlyWatched, setRecentlyWatched] = useState<Video[]>([]);

  useEffect(() => {
    const watchedVideos = localStorage.getItem("recentlyWatched");
    console.log("Watched videos from localStorage:", watchedVideos);

    if (watchedVideos) {
      const parsedVideos = JSON.parse(watchedVideos);
      console.log("Parsed watched videos:", parsedVideos);
      setRecentlyWatched(parsedVideos);
    }
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    img.src = DEFAULT_THUMBNAILS[Math.floor(Math.random() * DEFAULT_THUMBNAILS.length)];
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* Navigation Section */}
      <div className="relative lg:flex space-x-10 font-extrabold pl-42 pt-4 py-2">
        <div className="relative lg:flex space-x-1">
          <Link
            href="/"
            className="flex items-center hover:bg-yellow-700 transition bg-green-700 text-white rounded-xl p-2"
          >
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
          <Link href="/cameras" className="flex items-center hover:bg-yellow-700 transition bg-green-700 text-white rounded-xl p-2">
            <FaCamera className="mr-2" /> Cameras
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
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 bg-gray-100">
        <h1 className="text-3xl font-extrabold text-center mb-6">
          Recently Watched Videos
        </h1>

        {/* Display Recently Watched Videos */}
        {recentlyWatched.length === 0 ? (
          <p className="text-center text-gray-500">No videos watched yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {recentlyWatched.map((video) => (
              <div
                key={video.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="relative w-full h-48 bg-gray-200">
                  <Image
                    src={video.thumbnailUrl || DEFAULT_THUMBNAILS[Math.floor(Math.random() * DEFAULT_THUMBNAILS.length)]}
                    alt={video.title}
                    fill
                    className="object-cover"
                    onError={handleImageError}
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
        )}
      </div>

      <Footer />
    </main>
  );
};

export default RecentlyWatchedPage;