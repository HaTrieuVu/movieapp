import React, { useEffect, useState } from "react";

import { IoCloseCircleOutline } from "react-icons/io5";
import useFetchDetails from "../hooks/useFetchDetails";

const VideoPlay = ({ media_type, videoId, close }) => {
  const { data } = useFetchDetails(`/${media_type}/${videoId}/videos`);

  const handleCloseVideo = () => {
    close(false);
  };

  console.log(data);

  return (
    <section className="fixed flex items-center justify-center bg-neutral-700 top-0 right-0 left-0 bottom-0 z-40 bg-opacity-50">
      <div className="bg-black w-full lg:mt-10 max-h-[80vh] max-w-screen-lg aspect-video rounded relative">
        <button
          onClick={() => handleCloseVideo()}
          className="absolute top-[-30px] right-[-4px] text-4xl z-50"
        >
          <IoCloseCircleOutline />
        </button>

        <iframe
          src={`https://www.youtube.com/embed/${data?.results[0]?.key}`}
          
          className="w-full h-full"
        ></iframe>
      </div>
    </section>
  );
};

export default VideoPlay;
