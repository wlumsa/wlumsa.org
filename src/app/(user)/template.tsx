'use client'

import { motion } from 'framer-motion'
/**
 * A template function that applies a fade-in animation to its children. Uses Framer Motion and nextjs app templates
  * Related Docs
  * https://www.framer.com/motion/ 
  * https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#templates
 * @param {React.ReactNode} children - The content to be rendered inside the template.
 * @returns {JSX.Element} The rendered template component.
 * Note: Templates are simmilar to layouts with one key difference, templates do not persist state between their children unlike layouts
 */

export default function Template({ children }: { children: React.ReactNode }): JSX.Element {
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