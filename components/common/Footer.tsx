'use client';

import Link from 'next/link';
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ReactConfetti to avoid SSR issues
const ReactConfetti = dynamic(() => import('react-confetti'), {
  ssr: false
});

// Footer component with subscription functionality
export default function Footer() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setShowConfetti(true);
    setShowPopup(true);
    
    // Hide confetti after 5 seconds
    setTimeout(() => setShowConfetti(false), 5000);
    // Hide popup after 3 seconds
    setTimeout(() => setShowPopup(false), 3000);
    
    // Reset email field
    setEmail('');
    
    // Here you would typically send the email to your backend
    console.log('Subscribed email:', email);
  };

  return (
    <>
      {showConfetti && (
        <ReactConfetti
          width={typeof window !== 'undefined' ? window.innerWidth : 0}
          height={typeof window !== 'undefined' ? window.innerHeight : 0}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-yellow-500 animate-bounce">
            <h3 className="text-xl font-bold text-yellow-600">Thanks for subscribing!</h3>
            <p className="mt-2 text-gray-700">You&apos;ll receive our newsletter soon.</p>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="https://a-z-animals.com/animals/" target='blank' className="hover:text-yellow-300 transition">
                    All Animals
                  </Link>
                </li>
                <li>
                  <Link href="https://www.google.com/search?client=firefox-b-d&sca_esv=4c75ca2344971d57&tbm=lcl&sxsrf=AHTn8zp9PDWjYFELbw3dW5kwfExZL5E0mg:1744307478972&q=zoo&rflfq=1&num=10&sa=X&ved=2ahUKEwic36bdg86MAxXMJjQIHcrJBs0QjGp6BAgnEAE&biw=1869&bih=963#rlfi=hd:;si:;mv:[[53.6590358,-113.51271170000001],[50.8939364,-114.27528269999999]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:1" target='blank' className="hover:text-yellow-300 transition">
                    Your Local Zoos!
                  </Link>
                </li>
                <li>
                  <Link href="https://nationaltoday.com/animal-holidays/" target='blank' className="hover:text-yellow-300 transition">
                    Animal Holidays
                  </Link>
                </li>
                <li>
                  <Link href="https://www.worldwildlife.org/initiatives/wildlife-conservation" target='blank' className="hover:text-yellow-300 transition">
                    Conservation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MdEmail className="mr-2 text-yellow-300" />
                  <span>sait@zootube.com</span>
                </div>
                <div className="flex items-center">
                  <MdPhone className="mr-2 text-yellow-300" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="pt-2">
                  <p>123 Zoo Tube</p>
                  <p>Wildlife Calgary City, DK 394959</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">Follow Us</h3>
              <div className="flex space-x-4">
                <Link href="https://www.instagram.com/thecalgaryzoo/?hl=en" target="_blank" className="text-2xl hover:text-yellow-300 transition">
                  <FaInstagram />
                </Link>
                <Link href="https://twitter.com/calgaryzoo/status/1856451593602027593?ref_src=twsrc%5Etfw" target="_blank" className="text-2xl hover:text-yellow-300 transition">
                  <FaTwitter />
                </Link>
                <Link href="https://www.facebook.com/thecalgaryzoo/" target="_blank" className="text-2xl hover:text-yellow-300 transition">
                  <FaFacebook />
                </Link>
                <Link href="https://www.youtube.com/channel/UCA0-tJIG3bDQKoU8nh79Vkw" target="_blank" className="text-2xl hover:text-yellow-300 transition">
                  <FaYoutube />
                </Link>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-medium mb-2">ZooTube NewsLetter :3</h4>
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email please :)!"
                    className="px-3 py-2 text-white rounded-l focus:outline-none focus:ring-2 focus:ring-yellow-400 flex-grow"
                    required
                  />
                  <button 
                    type="submit"
                    className="bg-yellow-600 hover:bg-green-700 px-4 py-2 rounded-r transition"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} ZooTube. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-2">
              <Link href="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}