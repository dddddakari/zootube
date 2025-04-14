'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

type FormData = {
  email: string;
  password: string;
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.email === '' || formData.password === '') {
      setError('Please fill in both fields.');
      return;
    }

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userData = {
        email: formData.email,
        token: 'simulated-jwt-token',
        isAuthenticated: true
      };

      localStorage.setItem('user', JSON.stringify(userData));
      window.dispatchEvent(new Event('storage'));
      
      setError('');
      router.push(isLogin ? '/dashboard' : '/welcome');
    } catch {
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-extrabold text-center mb-6">
            {isLogin ? 'Log In' : 'Sign Up'} to Zootube :3
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-bold text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-lg font-bold text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 text-white font-extrabold bg-green-700 rounded-xl hover:bg-yellow-700 transition"
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => setIsLogin((prev) => !prev)}
              className="text-green-700 font-extrabold ml-1 hover:text-yellow-700"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AuthPage;