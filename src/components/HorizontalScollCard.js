import React, { useRef } from "react";
import Card from "../components/Card";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const HorizontalScollCard = ({ data = [], titleHeading, trending, media_type }) => {
    const containerRef = useRef();

    const handlePrev = () =>{
        containerRef.current.scrollLeft -= 300;
    }

    const handleNext = () => {
        containerRef.current.scrollLeft += 300;
    }

    return (
        <div className="container mx-auto px-3 my-6 mb-[50px]">
            <h2 className="text-2xl lg:text-3xl font-bold mb-5 capitalize ">{titleHeading}</h2>

            <div className="relative">
                <div
                    ref={containerRef}
                    className="grid gap-10 grid-flow-col overflow-x-scroll scroll-smooth transition-all scrollbar-none relative z-20"
                >
                    {data?.map((movie, i) => {
                        return <Card key={movie?.id} data={movie} media_type={media_type} trending={trending} index={i + 1} />;
                    })}
                </div>

                <div className="my-auto z-20 text-2xl text-gray-600 absolute top-[50%] lg:flex items-center justify-between w-full px-5 hidden">
                    <button
                        onClick={() => handlePrev()}
                        className="p-2 bg-white border-[1px] rounded-full transition-all hover:scale-105"
                    >
                        <FaAngleLeft />
                    </button>
                    <button
                        onClick={handleNext}
                        className="p-2 bg-white border-[1px] rounded-full transition-all hover:scale-105"
                    >
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HorizontalScollCard;
