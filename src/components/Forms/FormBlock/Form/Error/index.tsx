import * as React from 'react'
import {CircleAlert} from 'lucide-react'

export const Error: React.FC = () => {
  return <div className="text-sm text-red-900 bg-red-200 p-2 flex items-center gap-2 rounded-lg w-fit">
    <CircleAlert size={20} />
    <p> This field is required</p>
    </div>
}