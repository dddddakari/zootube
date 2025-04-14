'use client';
import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

interface Video {
  id: string;
  title: string;
  videoUrl: string;
  description: string;
}

// Add this type to help Next.js with its internal type checking
type PageProps = {
  params: {
    id: string;
  };
};

export default function VideoPage(props: PageProps) {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? props.params?.id;
  const router = useRouter();
  const [video, setVideo] = useState<Video | null>(null);


  useEffect(() => {
    if (!id) return;

    const fetchVideoData = async () => {
      try {
        const response = await fetch('/animalVideos.json');
        const videos = await response.json();
        const foundVideo = videos.find((v: Video) => v.id === id);

        if (foundVideo) {
          setVideo({
            ...foundVideo,
            description: `${foundVideo.title} - Wildlife footage`
          });
        } else {
          router.push('/404');
        }
      } catch (error) {
        console.error('Error fetching video:', error);
        router.push('/500');
      }
    };

    fetchVideoData();
  }, [id, router]);


  if (!video) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = getYouTubeId(video.videoUrl);

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center hover:bg-yellow-700 transition bg-green-700 text-white rounded-xl p-2 mb-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Videos
        </button>

        <h1 className="text-3xl font-extrabold text-center mb-6">{video.title}</h1>
        
        <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
          {youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              className="w-full h-[500px]"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.title}
            ></iframe>
          ) : (
            <div className="flex items-center justify-center h-[500px] bg-gray-800 text-white">
              Video unavailable
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">About this video:</h2>
          <p className="text-gray-700">{video.description}</p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
