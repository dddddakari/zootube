import AnimalCarousel from '@/components/animal/AnimalCarousel';
import AnimalGallery from '@/components/animal/AnimalGallery';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { FaCamera, FaQuestionCircle, FaShoppingCart, FaHistory } from 'react-icons/fa';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa6';

// This is the landing page of the app
// It fetches a list of animals from the API and displays them in a carousel and gallery

// The API URL is stored in the environment variable NEXT_PUBLIC_API_URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// The API URL is required for the app to work
// If it is not defined, an error is thrown
// This is done to ensure that the app does not crash if the API URL is not defined
export default async function Home() {
  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }

  // Fetch the list of animals from the API
  let animals = [];
  
  // Fetch the list of animals from the API
  // This is done with a try-catch block to handle any errors that may occur
  // If the fetch fails, an error is logged to the console
  // and an empty array is returned
  try {
    const response = await fetch(`${API_URL}/api/animals`);
    if (!response.ok) {
      throw new Error('Failed to fetch animals');
    }
    animals = await response.json();
  } catch (error) {
    console.error('Error fetching animals:', error);
  }
  console.log('API_URL:', API_URL); // Check this value is what you expect
  
  return (
    <main className="min-h-screen">
      <Header />
      <div className="relative lg:flex space-x-10 font-extrabold pl-42 pt-4 py-2">
        <div className='relative lg:flex space-x-1'>
            <Link href="/cameras" className="flex items-center hover:bg-yellow-700 transition bg-green-700 text-white rounded-xl p-2">
              <FaCamera className="mr-2" /> Cameras
            </Link>
            <Link href="/favourite" className="flex items-center hover:bg-yellow-700 transition bg-green-700 text-white rounded-xl p-2">
              <FaHeart className="mr-2" /> Favourites
            </Link>
            <Link href="/trivia" className="flex items-center hover:bg-yellow-700 transition bg-green-700 text-white rounded-xl p-2">
              <FaQuestionCircle className="mr-2" /> Trivia
            </Link>
            <Link href="/merch" className="flex items-center hover:bg-yellow-700 transition bg-green-700 text-white rounded-xl p-2">
              <FaShoppingCart className="mr-2" /> Shop
            </Link>
            <Link href="/recent" className="flex items-center hover:bg-yellow-700 transition bg-green-700 text-white rounded-xl p-2">
              <FaHistory className="mr-2" /> Recently Watched
            </Link>
        </div>

          </div>
      <div className="container mx-auto ">
        <AnimalCarousel/>
      </div>
      <div className="container mx-auto px-4 py-8">
        <AnimalGallery animals={animals} />

      </div>
      <Footer />
    </main>
  );
}