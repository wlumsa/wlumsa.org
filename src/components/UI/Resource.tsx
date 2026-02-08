import React from 'react'
import { ExternalLink } from 'lucide-react'

interface ResourceProps {
  title: string;
  url: string;
  className?: string;
}

const Resource: React.FC<ResourceProps> = ({ title, url, className }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block w-full rounded-xl border border-base-300 bg-base-200 px-5 py-4 text-left text-base text-base-content shadow-sm transition hover:bg-base-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-base-100 ${className || ""}`}
    >
      <span className="flex items-center justify-between gap-3 text-base font-medium sm:text-lg">
        <span className="flex-1 leading-relaxed">{title}</span>
        <ExternalLink className="h-4 w-4 flex-none text-secondary/80 transition group-hover:text-secondary" aria-hidden="true" />
      </span>
    </a>
  )
}

export default Resource
                       
