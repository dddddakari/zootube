"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaArrowLeft,
  FaQuestionCircle,
  FaHistory,
  FaCamera,
  FaCheck,
  FaTimes,
  FaCreditCard
} from "react-icons/fa";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
}

const PRODUCTS: Item[] = [
  {
    id: 1,
    name: 'Panda Plush',
    price: 18.99,
    image: 'https://i.imgur.com/gRZzrJv.jpeg',
  },
  {
    id: 2,
    name: 'Lone Snake On The Floor, First to Catch Can Keep',
    price: 12.5,
    image: 'https://i.imgur.com/GuQVw9P.jpeg',
  },
  {
    id: 3,
    name: 'Book Club with Lapinne',
    price: 9.99,
    image: 'https://i.imgur.com/H0Yaily.jpeg',
  },
  {
    id: 4,
    name: 'A bunch of baras',
    price: 22.0,
    image: 'https://i.imgur.com/aQ5Ntdg.png',
  },
  {
    id: 5,
    name: 'Panko The Dog In a Dashing Scarf',
    price: 1000000,
    image: 'https://i.imgur.com/ahawpVm.jpeg',
  },
  {
    id: 6,
    name: 'Personal Performance by Mike',
    price: 1030.5,
    image: 'https://i.imgur.com/eRzHLTm.jpeg',
  },
];

export default function MerchPage() {
  const [cart, setCart] = useState<Item[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'confirmation'>('cart');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderDetails, setOrderDetails] = useState<{
    number: string;
    total: string;
    email: string;
  } | null>(null);

  const addToCart = (item: Item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number (16 digits)';
    }
    if (!formData.expiry.trim()) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.expiry)) {
      newErrors.expiry = 'Invalid format (MM/YY)';
    }
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Invalid CVV (3-4 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    if (validateForm()) {
      setOrderDetails({
        number: `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
        total: total,
        email: formData.email
      });
      setCheckoutStep('confirmation');
      setCart([]);
    }
  };

  const renderCart = () => (
    <div className="mt-12 bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    width={50} 
                    height={50} 
                    className="rounded mr-3"
                  />
                  <span>{item.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-4">${item.price.toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-right font-bold mt-4 text-xl">
            Total: ${total}
          </div>
          <button
            onClick={() => setCheckoutStep('form')}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-bold flex items-center justify-center"
            disabled={cart.length === 0}
          >
            <FaCreditCard className="mr-2" /> Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );

  const renderCheckoutForm = () => (
    <div className="mt-12 bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">💳 Checkout</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="123 Main St, City, Country"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${errors.expiry ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="MM/YY"
                maxLength={5}
              />
              {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="123"
                maxLength={4}
              />
              {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCheckoutStep('cart')}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          ← Back to Cart
        </button>
        <button
          onClick={handleCheckout}
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-bold flex items-center"
        >
          <FaCheck className="mr-2" /> Place Order (${total})
        </button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="mt-12 bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FaCheck className="text-green-600 text-2xl" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
      <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
        <h3 className="font-semibold mb-2">Order Details</h3>
        <p><span className="font-medium">Order #:</span> {orderDetails?.number}</p>
        <p><span className="font-medium">Total:</span> ${orderDetails?.total}</p>
      </div>
      
      <p className="mb-6">A confirmation email has been sent to <span className="font-medium">{orderDetails?.email}</span>.</p>
      
      <button
        onClick={() => {
          setCheckoutStep('cart');
          setFormData({
            name: '',
            email: '',
            address: '',
            cardNumber: '',
            expiry: '',
            cvv: ''
          });
          setOrderDetails(null);
        }}
        className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-bold"
      >
        Continue Shopping
      </button>
    </div>
  );

  return (
    <main className="min-h-screen">
      <Header />

      {/* Navigation Section */}
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 bg-gray-100">
        <h1 className="text-3xl font-extrabold text-center mb-6">
          Animal Merch
        </h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {PRODUCTS.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
            >
              <div className="relative w-full h-64 bg-gray-200">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  unoptimized={true}
                  priority={false}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-green-700 font-bold mb-2">
                  ${item.price.toFixed(2)}
                </p>
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Section */}
        {checkoutStep === 'cart' && renderCart()}
        {checkoutStep === 'form' && renderCheckoutForm()}
        {checkoutStep === 'confirmation' && renderConfirmation()}
      </div>

      <Footer />
    </main>
  );
}