"use client";

import UploadPhotoForm from "@/components/Forms/UploadPhoto";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhotoVideo } from "react-icons/fa";

/**
 * Renders the page for uploading photos and videos.
 * @returns The rendered page component.
 */
export default function Page() {
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUploadProgress = (progress) => {
    setUploadProgress(progress);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 p-6">
      <motion.div
        className="flex flex-col flex-grow items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-center text-lg lg:text-4xl font-bold text-white mb-10"
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          <FaPhotoVideo className="inline-block mr-2 text-white" /> Upload your
          photos and videos here!
        </motion.h1>

        <div className="w-full flex flex-col items-center justify-center px-4">
          <motion.div
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md transition-all ease-in-out duration-300"
          >
            <UploadPhotoForm onProgress={handleUploadProgress} />
          </motion.div>

          {uploadProgress > 0 && (
            <motion.div
              className="w-full mt-5 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden shadow-sm">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-center text-white mt-2 animate-pulse">
                Uploading... {uploadProgress}%
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>

      <motion.footer
        className="text-white mt-10 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        Drag and drop your files or click the button to start!
      </motion.footer>
    </div>
  );
}
