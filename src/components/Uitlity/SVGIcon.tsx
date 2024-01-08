import React from "react";

interface SVGIconProps {
  svgContent: string;
  fill: string;
}

const SVGIcon: React.FC<SVGIconProps> = ({ svgContent, fill }) => {
  const svgBlob = new Blob([svgContent], { type: "image/svg+xml" });
  const svgUrl = URL.createObjectURL(svgBlob);

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        fill={fill}
      >
        <use xlinkHref={svgUrl} />
      </svg>
    </div>
  );
};

export default SVGIcon;
