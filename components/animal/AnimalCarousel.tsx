'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// This component displays a carousel of cute animal images with names and locations
// It automatically cycles through the images every 3 seconds
// and allows users to manually select images using buttons
// The images are sourced from Unsplash and other URLs

const animals = [
  {
    image: "https://media.istockphoto.com/id/996100200/photo/a-mooing-cow-funny-cow-photo-with-open-mouth.jpg?s=612x612&w=0&k=20&c=e6bS1FcIB0KV7xb7KJJKCQSXHm6MNKB627Y_7y2isRE=",
    name: "Lady Maisie",
    location: "Camden, England"
  },
  {
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    name: "Puddles",
    location: "Tokyo, Japan"
  },
  {
    image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    name: "Rex",
    location: "Sydney, Australia"
  }
];

export default function AnimalCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % animals.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentAnimal = animals[currentIndex];

  return (
    <div className="relative w-full xl:h-215 overflow-hidden shadow-lg">
      <Image
        src={currentAnimal.image}
        alt={`Cute ${currentAnimal.name}`}
        fill
        className="object-cover"
        priority
      />
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div className="text-white">
          <h3 className="text-xl font-bold">{currentAnimal.name}</h3>
          <p className="underline">{currentAnimal.location}</p>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {animals.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`View ${animals[index].name}`}
          />
        ))}
      </div>
    </div>
  );
}