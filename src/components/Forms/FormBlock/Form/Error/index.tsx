import * as React from "react";
import { CircleAlert } from "lucide-react";

export const Error: React.FC = () => {
  return (
    <div className="flex w-fit items-center gap-2 rounded-lg border border-red-300 bg-red-200 p-2 text-sm text-red-900 dark:border-red-800 dark:bg-red-900/30 dark:text-red-200">
      <CircleAlert size={20} />
      <p> This field is required</p>
    </div>
  );
};
