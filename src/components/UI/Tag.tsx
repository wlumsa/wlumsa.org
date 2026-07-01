import React from "react";
import { ReactNode } from "react";

interface TagProps {
  icon: ReactNode;
  text?: string;
}
const Tag: React.FC<TagProps> = ({ text, icon }) => {
  return (
    <div className="md:text-md m-2 flex max-w-fit flex-row items-center rounded-lg bg-secondary p-2 text-sm text-primary md:font-bold">
      {icon}
      {text && (
        <div>
          <h1 className="pl-[0.5rem]">{text}</h1>
        </div>
      )}
    </div>
  );
};

export default Tag;
