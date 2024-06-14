import React from "react";

const Loader = () => {
  return (
    <div className="flex z-[99999px] w-full h-screen justify-center items-center space-x-2 bg-loaderOverlay">
      <div className="text-center">
        <div class="flex justify-center items-center">
          <div class="animate-spin rounded-full h-12 w-32 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
