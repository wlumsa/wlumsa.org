import * as React from 'react'
import {CircleAlert} from 'lucide-react'

export const Error: React.FC = () => {
  return <div className="text-sm text-red-900 dark:text-red-200 bg-red-200 dark:bg-red-900/30 p-2 flex items-center gap-2 rounded-lg w-fit border border-red-300 dark:border-red-800">
    <CircleAlert size={20} />
    <p> This field is required</p>
    </div>
}