"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaCamera, FaQuestionCircle, FaShoppingCart, FaHistory} from "react-icons/fa";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

interface Video {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  description?: string;
  trivia?: string;
  duration?: string;
  views?: string;
}

const DEFAULT_THUMBNAILS = [
  "default-thumbnails/default1.jpg",
  "default-thumbnails/default2.jpg",
  "default-thumbnails/default3.jpg",
  "default-thumbnails/default4.jpg",
  "default-thumbnails/default5.jpg",
  "default-thumbnails/default6.jpg",
  "default-thumbnails/default7.jpg",
  "default-thumbnails/default8.jpg",
  "default-thumbnails/default9.jpg",
  "default-thumbnails/default10.jpg",
  "default-thumbnails/default11.jpg",
  "default-thumbnails/default12.jpg",
  "default-thumbnails/default13.jpg",
  "default-thumbnails/default14.jpg",
  "default-thumbnails/default15.jpg",
  "default-thumbnails/default16.jpg",
  "default-thumbnails/default17.jpg",
  "default-thumbnails/default18.jpg",
  "default-thumbnails/default19.jpg",
  "default-thumbnails/default20.jpg",

  
];

const DashboardPage = () => {
  const [favorites, setFavorites] = useState<Video[]>([]);
  const [recentlyWatched, setRecentlyWatched] = useState<Video[]>([]);
  const [animalOfTheDay, setAnimalOfTheDay] = useState<Video | null>(null);
  const [videoList, setVideoList] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = () => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavorites(storedFavorites.slice(0, 3));
    } catch (error) {
      console.error("Error loading favorites:", error);
      setFavorites([]);
    }
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/animalVideos.json");
        if (!response.ok) throw new Error("Failed to fetch videos");
        const data: Video[] = await response.json();
        setVideoList(data);
      } catch (error) {
        console.error("Error loading videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, []);

  useEffect(() => {
    loadFavorites();

    const handleStorageChange = () => {
      loadFavorites();
      
      // Also reload recently watched when storage changes
      const storedRecentlyWatched = JSON.parse(localStorage.getItem("recentlyWatched") || "[]");
      setRecentlyWatched(storedRecentlyWatched.slice(0, 3));
    };

    window.addEventListener('storage', handleStorageChange);

    // Load recently watched initially
    const storedRecentlyWatched = JSON.parse(localStorage.getItem("recentlyWatched") || "[]");
    setRecentlyWatched(storedRecentlyWatched.slice(0, 3));

    // Set animal of the day
    if (videoList.length > 0) {
      const today = new Date().getDate();
      const randomIndex = today % videoList.length; // Same animal all day
      setAnimalOfTheDay(videoList[randomIndex]);
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [videoList]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, id: string) => {
    const img = e.target as HTMLImageElement;
    const randomThumbnail = DEFAULT_THUMBNAILS[Math.floor(Math.random() * DEFAULT_THUMBNAILS.length)];
    img.src = `/${randomThumbnail}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-lg font-semibold">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      
      {/* Navigation Bar */}
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 ">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-green-800">Your Wildlife Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Favorites Section */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <h2 className="text-2xl font-bold p-4 bg-green-700 text-white">Your Favorites</h2>
            {favorites.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">No favorites yet!</p>
                <Link href="/" className="mt-2 inline-block text-green-700 hover:underline">
                  Browse videos to add favorites
                </Link>
              </div>
            ) : (
              <div>
                {favorites.map((video) => (
                  <div key={video.id} className="p-4 border-b hover:bg-gray-50 transition">
                    <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover"
                        onError={(e) => handleImageError(e, video.id)}
                        unoptimized={true}
                      />
                    </div>
                    <h3 className="text-lg font-semibold mt-2">{video.title}</h3>
                    <Link 
                      href={`/videos/${video.id}`} 
                      className="mt-2 inline-block text-green-700 hover:text-yellow-600 font-medium"
                    >
                      Watch Now →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recently Watched Section */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <h2 className="text-2xl font-bold p-4 bg-yellow-500 text-white">Recently Watched</h2>
            {recentlyWatched.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">No recently watched videos!</p>
                <Link href="/" className="mt-2 inline-block text-green-700 hover:underline">
                  Start watching some videos
                </Link>
              </div>
            ) : (
              <div>
                {recentlyWatched.map((video) => (
                  <div key={video.id} className="p-4 border-b hover:bg-gray-50 transition">
                    <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover"
                        onError={(e) => handleImageError(e, video.id)}
                        unoptimized={true}
                      />
                    </div>
                    <h3 className="text-lg font-semibold mt-2">{video.title}</h3>
                    <Link 
                      href={`/videos/${video.id}`} 
                      className="mt-2 inline-block text-green-700 hover:text-yellow-600 font-medium"
                    >
                      Watch Again →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Animal of the Day Section */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <h2 className="text-2xl font-bold p-4 bg-red-700 text-white">Animal of the Day</h2>
            {animalOfTheDay ? (
              <div className="p-4">
                <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src={animalOfTheDay.thumbnailUrl}
                    alt={animalOfTheDay.title}
                    fill
                    className="object-cover"
                    onError={(e) => handleImageError(e, animalOfTheDay.id)}
                    unoptimized={true}
                  />
                </div>
                <h3 className="text-lg font-semibold mt-4">{animalOfTheDay.title}</h3>
                <p className="text-gray-600 mt-1">{animalOfTheDay.description}</p>
                <Link 
                  href={`/videos/${animalOfTheDay.id}`} 
                  className="mt-4 inline-block bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition"
                >
                  Meet Today&apos;s Star →
                </Link>
              </div>
            ) : (
              <div className="p-6 text-center">
                <div className="relative w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                <p className="text-gray-500">Loading today&apos;s special animal...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default DashboardPage;