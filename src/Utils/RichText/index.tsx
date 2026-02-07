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
          'w-full max-w-none': enableGutter,
          'max-w-none': !enableGutter,
          ' ': enableProse,

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
