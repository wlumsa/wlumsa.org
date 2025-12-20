import React from 'react';
import Image from "next/image";
import Link from "next/link"
interface MasjidCardProps {
    name: string;
    image: string;
    address: string;
    websiteLink: string
    googleMapsLink: string;
  }
  
const MasjidCard: React.FC<MasjidCardProps> = ({name, image, address, websiteLink, googleMapsLink}) => {
  return (
    <div className={"bg-base-100 dark:bg-base-200 border border-base-300 dark:border-base-700 rounded-xl p-4 sm:p-6 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-200 hover:border-primary/30"} >
    <div className="flex flex-row gap-6">
    {image && image.length > 0 && image[0] ? (
        <Image
          src={image}
          alt={ "ICW image"}
          width={150}
          height={150}
          decoding="async"
          loading="lazy"
          className="object-cover transition-transform duration-200 hover:scale-105 motion-reduce:hover:scale-100 rounded-lg"
        /> 
      
    ): 
         <div className="" aria-hidden>
            <span className="text-xs text-base-content/50">No image</span>
          </div>

}
   
    <div className="flex min-w-0 flex-1 flex-col justify-between">
      <div>
        <h2
          className={`mb-1 font-serif text-lg font-semibold text-primary sm:text-xl `}
        >
       {name}
        </h2>
      
      
          <div className="space-y-1 text-xs text-base-content/60 sm:text-sm">
           
            <p>
              <strong>Location:</strong> {address}
            </p>
          </div>
        
      </div>
      <div className="mt-3 flex gap-3 sm:mt-4 sm:gap-4">
        <Link
          href={`${googleMapsLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary transition-colors hover:text-primary/80 hover:underline"
          aria-label="Open Google Maps for this mosque"
        >
          Google Maps
        </Link>

        <Link
          href={websiteLink}
          target="_blank"
          rel="noopener noreferrer"
            className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-content transition-colors hover:bg-primary/90 sm:px-4"
            aria-label="Open restaurant website"
          >
            Website
          </Link>
        
      </div>
      </div>
    </div>
  </div>

  );
};

export default MasjidCard;
