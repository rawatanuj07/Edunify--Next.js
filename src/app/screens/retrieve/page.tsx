"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, PropsWithChildren } from "react";
type CardProps = {
  id: number;
  name: string;
  address: any;
  city: string;
  image: any;
};
const SchoolCard = ({
  id,
  name,
  address,
  city,
  image,
}: PropsWithChildren<CardProps>) => {
  // const { id, name, address, city, imagePath } = school;
  console.log("Schools IMGare:", image);

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pt-4 pl-4 pr-4 mb-6 transform transition-all duration-500 hover:scale-105">
      <Link href={`/schools/${name}`} passHref>
        <Link href="">
          <div className="relative rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105" style={{ height: '200px' }}>
            <div className="absolute inset-0">
              <Image
                src={image}
                alt={`Image of ${name}`}
                                // objectFit="cover"
                // className="object-scale-down"
                width={350}
                height={300}
              />
                  {/* <div className="absolute inset-0 rounded-lg overflow-hidden" style={{ zIndex: 1 }}></div> */}

            </div>
          </div>
        </Link>
      </Link>
      <div className="p-5">
        <Link href={`/schools/${name}`} passHref>
          <Link href="">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
          </Link>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {address}, {city}
        </p>
      </div>
    </div>
  );
};
interface Schoolss {
  id: number;
  name: string;
  address: string;
  city: string;
  image: any;

  // other properties...
}
export default function Home() {
  const [schools, setSchools] = useState<Schoolss[]>([]);

  useEffect(() => {
    fetchSchools();
    // console.log("Schools are:", schools[0]);
  }, []);

  const fetchSchools = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/getallschool");
      const data = await res.json();
      setSchools(data[0]);
      console.log("Schools fetched:", data[0]);

      // console.log("SchoolsData fetched:", typeof(schools.name));
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };
  console.log("Schools aresQ:", schools);

  return (
    <div className="pl-4 ml-8 mt-4 ">
      <h1 className="font-bold text-5xl  py-2 text-center">Schools</h1>
      <hr className="mt-4 pt-8 h-[0.5px] w-full bg-gray-separator tab:mt-2" />
      <div className="flex flex-wrap">
        {schools.map((school) => (
          <div
            key={school.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2"
          >
            <SchoolCard {...school} />
          </div>
        ))}
      </div>
    </div>
  );
}
