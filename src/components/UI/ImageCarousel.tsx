import React from 'react'

interface ImageCarouselProps {
    images: string[];
}
const ImageCarousel:React.FC<ImageCarouselProps> = (images) => {
  return (
    <div>
        <div>
        <img
                src={images[0].toString() : ""}
                className="object-cover lg:rounded "
                style={{ height: "26em", width: "48em" }}/> 
        </div>
    </div>
  )
}

export default ImageCarousel