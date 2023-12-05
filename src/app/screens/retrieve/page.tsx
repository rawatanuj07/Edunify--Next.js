import Image from 'next/image';
import Link from 'next/link';

function SchoolCard({ school }: any) {
  // Provide default values if school is undefined
  const { name = 'rawat', address = 'fbd', city = 'blb' } = school || {};

  // Update the image path based on your project structure
  const imagePath = `/uploads/me.jpg`; // Adjust the extension as needed

  return (
    <div className="relative h-80 w-60 rounded shadow-lg mx-auto border border-gray-300 overflow-hidden">
      <Link href={`/schools/${name}`} passHref>
          <div className="h-2/3 relative">
            <Image
              src={imagePath}
              alt={`Image of ${name}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-4 flex flex-col justify-between h-1/3">
            <div>
              <div className="font-bold text-xl mb-2">{name}</div>
              <div className="text-gray-700 mb-2">{address}, {city}</div>
            </div>
            <div className="flex justify-end">
              <span className="bg-blue-500 text-white py-1 px-3 rounded-full text-sm">View Details</span>
            </div>
          </div>
      </Link>
    </div>
  );
}

export default SchoolCard;
