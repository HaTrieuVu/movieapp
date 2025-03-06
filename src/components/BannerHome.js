import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const BannerHome = () => {
    const bannerData = useSelector(state => state.movieoData.bannerData)
    const imageURL = useSelector(state => state.movieoData.imageURL)
    const [currentImage, setCurrentImage] = useState(0)

    const handlePrev = () =>{
        if(currentImage < 0)
        {
            setCurrentImage(bannerData.length -1)
        }
        else {
            setCurrentImage(prev => prev - 1)
        }
    }

    const handleNext = () => {
        if(currentImage < bannerData.length -1)
        {
            setCurrentImage(prev => prev + 1)
        } else {
            setCurrentImage(0);
        }
    }

    useEffect(() => {
        const sliderBanner = setInterval(() => {
            if(currentImage < bannerData.length -1)
            {
                setCurrentImage(prev => prev + 1)
            } else {
                setCurrentImage(0);
            }
        }, 5000)
    
        return () => {
            clearInterval(sliderBanner)
        }
    }, [currentImage, bannerData, imageURL])
    

    return (
        <section className='w-full h-full'>
            <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
                {
                    bannerData.map((data, i) => {
                        return (
                           <div key={i} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden transition-all relative' style={{transform: `translateX(-${currentImage * 100}%)`}}>
                                <div className='w-full h-full'>
                                    <img className='h-full w-full object-cover' src={imageURL + data.backdrop_path} alt="bannerImg" />
                                </div>

                                {/* button orev and next image banner */}
                                <div className='my-auto z-20 text-gray-600 text-2xl absolute top-[-50px] lg:flex items-center justify-between w-full h-full px-5 hidden'>
                                    <button onClick={() => handlePrev()} className='p-2 bg-transparent border-[1px] border-[#4b5563] hover:text-white hover:border-white rounded-full'>
                                        <FaAngleLeft/>
                                    </button>
                                    <button onClick={() => handleNext()} className='p-2 bg-transparent border-[1px] border-[#4b5563] hover:text-white hover:border-white rounded-full'>
                                        <FaAngleRight/>
                                    </button>
                                </div>

                                <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'>
                                </div>

                                <div className='container m-0 lg:m-6 absolute bottom-0 lg:bottom-20 max-w-md px-3'>
                                    <h2 className='font-bold text-2xl lg:text-4xl text-white'>{data.title || data.original_name}</h2>
                                    <p className='text-ellipsis line-clamp-3 '>{data.overview}</p>
                                    <div className='flex items-center gap-4'>
                                        <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                                        <span>|</span>
                                        <p>View: {Number(data.popularity).toFixed(0)}</p>
                                    </div>
                                    <Link className='bg-red-400 p-4 text-white font-bold text-xl rounded-lg mt-4 cursor-pointer hover:bg-red-700 transition-all'>
                                            Watch Now
                                    </Link>
                                </div>
                           </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default BannerHome