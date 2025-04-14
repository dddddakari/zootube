import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
 
export default function PrivacyPolicy() {
  return (
    <main className="relative min-h-screen bg-[url('/frog.svg')] bg-no-repeat bg-cover bg-center">
   
      <div className="relative z-10">
        <Header />    
        <div>
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap gap-2 font-bold">
            <Link href="/" className="flex items-center hover:bg-yellow-400 transition bg-yellow-700 text-white rounded-lg px-4 py-2">
              <FaArrowLeft className="mr-2" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
        <div className="container mx-auto px-4 py-10">
          <div className="bg-white shadow-lg rounded-xl p-8 max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-center text-yellow-700">Privacy Policy</h1>
 
            <p className="mb-4 text-gray-700">
              Here at ZooTube we respect your privacy and are committed to protecting it through our compliance with this policy.
              This Privacy Policy explains how we collect, use, and protect your personal information when you use our website.
              By accessing or using the website, you agree to the terms of this Privacy Policy.
            </p>
 
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-700">Information We Collect</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 px-6">
              <li>Information you provide directly to us (e.g., signing up, filling forms).</li>
              <li>Data collected automatically such as IP addresses, browser types, and pages visited.</li>
              <li>Cookies and usage data to improve the user experience.</li>
            </ul>
 
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-700">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 px-6">
              <li>To operate and maintain the website.</li>
              <li>To communicate with you, including responding to inquiries and providing updates.</li>
              <li>To improve our website, services, and user experience.</li>
            </ul>
 
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-700">Sharing Your Information</h2>
            <p className="mb-4 text-gray-600 px-6">
              We do not sell or trade your personal information. We may share your information with trusted third-party service
              providers who help us operate the website—such as MongoDB, which securely stores our data.
              These providers are required to keep your information confidential and use it only for the purposes we specify.
            </p>
 
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-700">Your Rights</h2>
            <p className="mb-4 text-gray-600 px-6">
              You have the right to access, correct, or delete your personal data at any given time.
            </p>
 
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-700">Changes to This Policy</h2>
            <p className="mb-4 text-gray-600 px-6">
              We may update this Privacy Policy from time to time. You will be able to find any significant changes through updates on this page.
              We encourage you to review this Privacy Policy periodically for any changes.
            </p>
 
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-700">Contact Us</h2>
            <p className="mb-4 text-gray-600 px-6">
              If you have any questions about this Privacy Policy, please contact us at sait@zootube.com,
              or through our phone number at +1 (555) 123-4567.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
 