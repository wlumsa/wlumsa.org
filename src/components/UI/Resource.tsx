import React from 'react'
import { ExternalLink } from 'lucide-react'

interface ResourceProps {
  title: string;
  url: string;
}

const Resource: React.FC<ResourceProps> = ({ title, url }) => {
  return (
    <div
      className="rounded-xl text-center p-2 transition ease-in-out delay-150 hover:-translate-y-1 my-5 mx-4 md:mx-0 border border-primary/60 bg-transparent hover:border-secondary"
    >
      <a
        href={url }
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 p-2 text-xl font-medium text-primary hover:text-secondary"
      >
        <span>{title}</span>
        <ExternalLink className="h-5 w-5" aria-hidden="true" />
      </a>
    </div>
  )
}

export default Resource
                       
