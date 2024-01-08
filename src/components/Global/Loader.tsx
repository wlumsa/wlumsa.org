// components/Loader.js
import React from "react";

const Loader = () => {
  return (
    <div>
      <span className="loading loading-dots loading-xs"></span>
      <span className="loading loading-dots loading-sm"></span>
      <span className="loading loading-dots loading-md"></span>
      <span className="loading loading-dots loading-lg"></span>
    </div>
  );
};

export default Loader;
