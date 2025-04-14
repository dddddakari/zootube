import Link from 'next/link';
import Image from 'next/image';

interface Animal {
  _id: string;
  name: string;
  species: string;
  conservationStatus: string;
  images?: string[];
}

interface AnimalGalleryProps {
  animals: Animal[];
}

export default function AnimalGallery({ animals }: AnimalGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {animals.map((animal) => (
        <Link 
          key={animal._id} 
          href={`/animals/${animal._id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          {/* Image container with fallback */}
          <div className="relative h-48 bg-gray-100">
            {animal.images && animal.images.length > 0 ? (
              <Image
                src={animal.images[0]}
                alt={animal.name}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image Available
              </div>
            )}
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">{animal.name}</h2>
            <p className="text-gray-600">{animal.species}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {animal.conservationStatus}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}