import React from 'react'

interface ResourceProps {
  title: string;
  url: string;
}

const Resource: React.FC<ResourceProps> = ({ title, url }) => {
  return (
    <div
      className="bg-primary rounded-xl text-center p-2 hover:bg-secondary transition ease-in-out delay-150 hover:-translate-y-1 my-1 mx-4 md:mx-0"
    >
      <a
        href={url }
        target="_blank"
        rel="noopener noreferrer"
        className="block p-2 text-xl font-medium text-white"
      >
        {title}
      </a>
    </div>
  )
}

export default Resource
                       
