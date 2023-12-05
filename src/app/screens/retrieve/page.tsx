
"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, PropsWithChildren } from "react";
type CardProps = {
  id: number;
  name: string;
  address: any;
  city: string;
  imagePath: any;
};
const SchoolCard = ({
 id, name, address, city,  imagePath,

}: PropsWithChildren<CardProps>) =>{
  // const { id, name, address, city, imagePath } = school;
  console.log("Schools IMGare:", imagePath);

  return (
    <Link className="h-80 w-60 rounded shadow-lg mx-auto border border-gray-300 overflow-hidden" href={`/schools/${name}`} passHref>
      <div className="h-40 relative">
        <Image
          src={imagePath}
          // alt={`Image of ${name}`}
          alt="IMAGE"
          layout="fill"
          objectFit="cover" />
      </div>
      <div className="p-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <div className="text-gray-700 mb-2">{address}, {city}</div>
      </div>
    </Link>
  );
}
interface Schoolss {
  id: number;
  name: string;
  address: string;
  city: string;
  imagePath: any;
  
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
      <div>
      <h1 className="font-medium text-2xl my-4 py-2">Schools</h1>
      <hr className="mt-1 h-[0.5px] w-full bg-gray-separator tab:mt-2" />
      <div className="flex flex-wrap">
        {schools.map((school) => (
          <div key={school.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2">
            <SchoolCard {...school} />
          </div>
        ))}
      </div>
    </div>
  
  );
    
}
