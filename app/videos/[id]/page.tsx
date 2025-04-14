'use client';
import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

// format for the displaying the videos
// but for when you're streaming the video

// format for the displaying the videos
interface Video {
  id: string;
  title: string;
  videoUrl: string;
  description: string;
  trivia: string;
  duration: string;
  views: string;
}

// random default trivia to use if the video thumbnail fails to load
const ANIMAL_TRIVIA = [
  "Elephants can recognize themselves in mirrors!",
  "A group of flamingos is called a 'flamboyance'",
  "Octopuses have three hearts and blue blood",
  "Penguins propose to their mates with pebbles",
  "Kangaroos can't walk backwards"
];

// Declare the function outside of the useEffect hook
const addToRecentlyWatched = (video: Video) => {
  const existingVideos = JSON.parse(localStorage.getItem("recentlyWatched") || "[]");
  const updatedVideos = [video, ...existingVideos].slice(0, 5); // Limit to the last 5 videos
  localStorage.setItem("recentlyWatched", JSON.stringify(updatedVideos));
};

const toggleFavorite = (video: Video) => {
  const existingFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const isAlreadyFavorite = existingFavorites.some((fav: Video) => fav.id === video.id);
  
  let updatedFavorites;
  if (isAlreadyFavorite) {
    updatedFavorites = existingFavorites.filter((fav: Video) => fav.id !== video.id);
  } else {
    updatedFavorites = [video, ...existingFavorites];
  }
  
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  return !isAlreadyFavorite;
};

// This page fetches and displays a single video based on the ID in the URL
// It also handles fallback thumbnails for videos that fail to load
// and provides trivia about a random animal
export default function VideoPage({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<Video | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [randomTrivia, setRandomTrivia] = useState("");

  // Fetch video data when the component mounts or when the ID changes
  // This function fetches the video data from a JSON file and sets the state
  // It also adds the video to the recently watched list in local storage
  useEffect(() => {
    const fetchVideo = async () => {
      const response = await fetch('/animalVideos.json');
      const videos = await response.json();
      const foundVideo = videos.find((v: Video) => v.id === params.id);
      setVideo(foundVideo);
      if (foundVideo) {
        addToRecentlyWatched(foundVideo);
        // Check if this video is already a favorite
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setIsFavorite(favorites.some((fav: Video) => fav.id === foundVideo.id));
      }
      
      setRandomTrivia(
        foundVideo?.trivia || 
        ANIMAL_TRIVIA[Math.floor(Math.random() * ANIMAL_TRIVIA.length)]
      );
    };
    
    // Fetch video data when the component mounts or when the ID changes
    fetchVideo();
  }, [params.id]);

  // Extract YouTube ID from URL
  // This function uses a regular expression to extract the video ID from the YouTube URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (!video) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      Loading...
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="flex items-center hover:bg-yellow-700 transition bg-green-700 text-white rounded-xl p-2 mb-6"
        >
          <FaArrowLeft className="mr-2 bold" />
          Back to Videos
        </button>

        {/* Video Player */}
        <div className="bg-black rounded-lg overflow-hidden shadow-xl">
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeId(video.videoUrl)}?autoplay=1`}
            className="w-full aspect-video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Info */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{video.title}</h1>
              <p className="text-gray-600 mt-1">
                {video.views} views • {video.duration}
              </p>
            </div>
            <button 
              onClick={() => {
                if (video) {
                  const newFavoriteState = toggleFavorite(video);
                  setIsFavorite(newFavoriteState);
                }
              }}
              className="text-2xl text-red-500 hover:scale-110 transition"
              aria-label="Favorite"
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          <p className="mt-4 text-gray-700">{video.description}</p>
          
          {/* Trivia Section */}
          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <h3 className="font-bold text-lg text-yellow-800">🐾 Animal Trivia</h3>
            <p className="mt-1 text-yellow-700">{randomTrivia}</p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
