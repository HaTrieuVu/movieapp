import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import { useSelector } from "react-redux";
import momemt from "moment";
import Divider from "../components/Divider";
import HorizontalScollCard from "../components/HorizontalScollCard";
import VideoPlay from "../components/VideoPlay";

const DetailsPage = () => {
  const { explore, id } = useParams();
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const { data } = useFetchDetails(`/${explore}/${id}`);
  const { data: castData, loading } = useFetchDetails(
    `/${explore}/${id}/credits`
  );
  const { data: similarData } = useFetchDetails(`/${explore}/${id}/similar`);
  const { data: recommentData } = useFetchDetails(
    `/${explore}/${id}/recommendations`
  );

  const duration = Number(data?.runtime / 60)
    .toFixed(1)
    .split(".");
  const writer = castData?.crew
    ?.filter((el) => el?.job === "Writer")
    ?.map((e) => e?.name)
    .join(",");

  const handlePlayVideo = () => {
    setPlayVideo(true)
    setPlayVideoId(id)
  }

  return (
    <div className="">
      <div className="w-full h-[70vh] relative hidden lg:block">
        <img
          className="w-full h-full object-cover"
          src={`${imageURL + data?.backdrop_path}`}
          alt=""
        />
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/70 to-transparent"></div>
      </div>

      <div className="lg:container lg:mx-auto px-3 lg:py-16 lg:flex gap-5">
        <div className="lg:-mt-28 flex flex-col items-center h-[400px] w-full lg:min-w-[250px] lg:max-w-[250px] overflow-hidden relative mx-auto lg:mx-0">
          <img
            src={imageURL + data?.poster_path}
            alt="posterImg"
            className="w-full h-[82%] lg:h-80 lg:w-60 object-cover rounded lg:rounded-2xl"
          />
          <button onClick={() => handlePlayVideo()} className="px-5 py-2 bg-red-500 text-white rounded mt-5 cursor-pointer hover:scale-105 transition-all font-bold text-2xl">
            Watch Now
          </button>
        </div>

        <div className="mt-10 lg:mt-0">
          <h2 className="font-bold text-3xl text-white">
            {data?.original_title || data?.title || data?.name}
          </h2>
          <p className="text-xl mt-2 text-neutral-400">{data?.tagline}</p>

          <Divider />

          <div className="flex items-center my-3 gap-5">
            <div>Reating: {Number(data?.vote_average).toFixed(1)}+</div>
            <span>|</span>
            <p>View: {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration: {duration[0]}h {(duration[1] / 10) * 60}m
            </p>
          </div>

          <Divider />

          <div>
            <h3 className="text-2xl font-bold text-white">Overview</h3>
            <p>{data?.overview}</p>

            <div className="flex items-center my-3 gap-5">
              <p>Status: {data?.status}</p>
              <span>|</span>
              <p>
                Release Date:{" "}
                {momemt(data?.release_date).format("MMM Do YY") ||
                  momemt(data?.last_air_date).format("MMM Do YY")}
              </p>
              <span>|</span>
              <p>Revenue: {Number(data?.revenue)}</p>
            </div>
          </div>

          <Divider />

          {!loading && (
            <div>
              <p>
                <span className="text-white text-xl">Director: </span>
                {/* {castData && castData?.crew[0]?.name} */}
              </p>
              <p>
                <span className="text-white text-xl">Writer: </span>
                {writer}
              </p>
            </div>
          )}

          <Divider />

          <h2 className="text-lg lg:text-2xl font-bold my-3">Cast : </h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-3">
            {castData?.cast
              ?.filter((c) => c.profile_path)
              ?.map((cast, i) => {
                return (
                  <div key={`cast-${cast?.cast_id}-${i}`}>
                    <div>
                      <img
                        className="w-24 h-24 rounded-full object-cover"
                        src={imageURL + cast?.profile_path}
                        alt=""
                      />
                    </div>
                    <p className="text-center text-sm text-neutral-300 mt-1">
                      {cast?.name}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div>
        <HorizontalScollCard
          data={similarData?.results}
          titleHeading={"Similar " + explore}
          media_type={explore}
          trending={false}
        />
      </div>

      <div>
        <HorizontalScollCard
          data={recommentData?.results}
          titleHeading={"Recommendation " + explore}
          media_type={explore}
          trending={false}
        />
      </div>

      {
        playVideo && (
          <VideoPlay media_type={explore} videoId={playVideoId} close={() => setPlayVideo(false)} />
        )
      }
    </div>
  );
};

export default DetailsPage;
