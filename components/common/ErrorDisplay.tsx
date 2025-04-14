'use client';

// This component displays an error message when the animal data fails to load
// It also provides a button to refresh the page

export default function ErrorDisplay() {
  return (
    <div className="text-center p-8">
      <h2 className="text-xl text-red-600 mb-4">Failed to load animals</h2>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-blue-700"
      >
        Refresh Page
      </button>
    </div>
  );
}