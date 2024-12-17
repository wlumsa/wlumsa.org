import * as React from 'react'


export const Width: React.FC<{
  children: React.ReactNode
  width?: number
}> = ({ children, width }) => {
  return (
    <div className="" style={{ width: width ? `${width}%` : undefined }}>
      {children}
    </div>
  )
}