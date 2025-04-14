import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
 
export default function TermsOfService() {
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
          <div className="bg-white shadow-lg rounded-xl p-8 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-center text-yellow-700">Terms of Service</h1>
 
            <p className="mb-4 text-center text-gray-700">
              Welcome! By accessing or using our service, you agree to be bound by these Terms of Service.
              Please read them carefully before you start to use the website.
            </p>
 
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-700">Changes to the Terms of Service</h2>
            <p className="mb-4 text-gray-600 px-6">
              We may revise and update these Terms of Service from time to time.
              All changes take effect immediately after posting, and apply to all aspects of our website post update. <br />
              If you continue to use the website afterward, you are agreeing with the updated Terms of Service.
              The most current version will always be available on this page.
            </p>
 
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-700">Changes to the Website</h2>
            <p className="mb-4 text-gray-600 px-6">
              Although we may update the website from time to time, its content is not necessarily complete or up-to-date.
              Any of the material on the website may be out of date at any given time, and we are under no obligation to update it.
            </p>
 
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-700">Accessing the Website</h2>
            <p className="mb-4 text-gray-600 px-6">
              We do not guarantee that the website, or any content on it, will always be available or be uninterrupted.
              Access to the website is permitted on a temporary basis. We may suspend, withdraw, discontinue or change all or any part of the website without notice. <br />
              We will not be liable to you if for any reason the website is unavailable at any time or for any period.
            </p>
 
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-700">Use License</h2>
            <p className="mb-4 text-gray-600 px-6">
              Contact us if you would like to use any of the content on the website.
              You may not use any content from the website without our express written permission. The license may be granted or denied at our discretion. <br />
              You may not use the website for any illegal or unauthorized purpose. You agree to comply with all local laws regarding online conduct and acceptable content. <br /><br />
              Additionally, you agree not to:
            </p>
 
            <ul className="list-disc list-outside pl-6 text-gray-600 space-y-2 mb-6 px-6">
              <li>
                Use the website in any way that could damage, disable, overburden, or impair the website or interfere with any other partys use of the website.
              </li>
              <li>
                Use any robot, spider, or other automatic device, process, or means to access the website for any purpose.
              </li>
              <li>
                Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the website, the server on which the website is stored, or any server, computer, or database connected to the website.
              </li>
              <li>
                Otherwise attempt to interfere with the proper working of the website.
              </li>
            </ul>
 
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-700">Content</h2>
            <p className="mb-4 text-gray-600 px-6">
              The content on this website is for educational information purposes only. We do not guarantee the accuracy,
              completeness, or usefulness of any information on the website. Any reliance you place on such information is strictly at your own risk. <br />
              We are not responsible for any errors or omissions in the content on the website, or for any loss or damage of any kind
              incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available via the website.
            </p>
 
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-700">Termination</h2>
            <p className="mb-4 text-gray-600 px-6">
              We reserve the right to terminate or suspend your access to the website, without prior notice or liability, for any reason whatsoever,
              including without limitation if you breach these Terms of Service.
            </p>
 
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-700">Entire Agreement</h2>
            <p className="mb-4 text-gray-600 px-6">
              These Terms of Service and our{' '}
              <Link href="/privacy" className="text-blue-600 underline hover:text-blue-800">
                Privacy Policy
              </Link>{' '}
              constitute the entire agreement between you and us regarding the use of the website,
              superseding any prior agreements between you and us.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}