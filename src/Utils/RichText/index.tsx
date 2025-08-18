import { cn } from '../cn'
import React from 'react'

import { serializeLexical } from './searlize'
type Props = {
  className?: string
  content: any;
  enableGutter?: boolean
  enableProse?: boolean
}

const RichText: React.FC<Props> = ({
  className,
  content,
  enableGutter = true,
  enableProse = true,
}) => {
  if (!content) {
    return null
  }

  return (
    <div
      className={cn(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose prose-lg dark:prose-invert prose-headings:text-primary prose-p:text-base-content prose-strong:text-base-content prose-a:text-primary hover:prose-a:text-primary/80': enableProse,

        },
        "RichText",
        className,
      )}
    >
      {content &&
        !Array.isArray(content) &&
        typeof content === 'object' &&
        'root' in content &&
        serializeLexical({ nodes: content?.root?.children })}
    </div>
  )
}

export default RichText
