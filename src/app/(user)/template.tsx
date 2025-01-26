'use client'

import { motion } from 'framer-motion'
import CountdownComponent from './ramadan/CountdownComponent'


export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.1 }}
    >

      {children}
    </motion.div>
  )
}