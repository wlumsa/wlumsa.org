import { useRouter } from 'next/router'
 
export default function Page() {
  const router = useRouter()
  return (
    <div>{router.query.id}</div>
  )
}

import React from 'react'

