'use client';
import React, { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaCamera, FaHistory, FaQuestionCircle, FaTrashAlt } from "react-icons/fa";
 
interface Video {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
}
 
const DEFAULT_THUMBNAILS = [
  "default-thumbnails/default1.jpg",
  "default-thumbnails/default2.jpg",
  "default-thumbnails/default3.jpg",
  "default-thumbnails/default4.jpg",
];
 
const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Video[]>([]);
 
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);
 
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    const random = Math.floor(Math.random() * DEFAULT_THUMBNAILS.length);
    img.src = `/${DEFAULT_THUMBNAILS[random]}`;
  };
 
  const handleRemove = (id: string) => {
    const updatedFavorites = favorites.filter((video) => video.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
 
  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
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
            href="/recent"
            className="flex items-center hover:bg-yellow-700 transition bg-green-700 text-white rounded-xl p-2"
          >
            <FaHistory className="mr-2" /> Recently Watched
          </Link>
        </div>
      </div>

 
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-green-700 text-center mb-8">Your Favorite Videos</h1>
 
        {favorites.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">You havent added any favorite videos yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((video) => (
              <div
                key={video.id}
                className="group relative bg-white rounded-lg shadow-md p-4 transform transition-transform duration-200 hover:scale-105 hover:shadow-xl"
 
              >
                <Link href={`/videos/${video.id}`} className="block">
                  <div className="relative w-full h-48 bg-gray-200 rounded overflow-hidden">
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      className="object-cover"
                      onError={handleImageError}
                      unoptimized
                    />
                  </div>
                  <h2 className="text-xl font-semibold mt-4">{video.title}</h2>
                  <p className="mt-2 text-green-700 font-medium group-hover:text-yellow-600 transition-colors">
                    Watch Again
                  </p>
                </Link>
 
                <button
                  onClick={() => handleRemove(video.id)}
                  className="absolute bottom-3 right-3 text-red-500 hover:text-red-900"
                  title="Remove from favorites"
                >
                  <FaTrashAlt size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
 
      <Footer />
    </main>
  );
};
 
export default FavoritesPage;