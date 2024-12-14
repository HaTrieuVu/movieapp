import React from 'react'
import { useSelector } from 'react-redux'
import momemt from "moment"
import { Link } from 'react-router-dom'

import noImage from "../assets/no_image.png"

const Card = ({data, trending, index}) => {

    const imageURL = useSelector(state => state.movieoData.imageURL)
    return (
        <Link to={`/${data?.media_type}/${data?.id}`} className='w-full min-w-[250px] h-80 overflow-hidden rounded-md relative hover:scale-95 transition-all cursor-pointer'>
            
            <img className='h-full object-cover' src={data?.backdrop_path ? imageURL + data?.backdrop_path : noImage} alt="img" />
            
            <div className='absolute top-0 le'>
                {
                    trending && (<div className='py-1 overflow-hidden px-4 rounded-r-full backdrop-blur-3xl bg-black/60'>
                        #{index} Trending
                    </div>)
                }
            </div>

            <div className='absolute flex flex-col px-4 py-1 text-white bottom-0 h-16 backdrop-blur-3xl bg-black/90 w-full'>
                <h2 className='text-ellipsis text-2xl line-clamp-1'>{data?.title || data?.original_title || data?.name}</h2>
                <div className='flex justify-between'>
                    <p>{ momemt(data?.release_date).format("MMM Do YY")  || momemt(data?.first_air_date).format("MMM Do YY")}</p>
                    <p>Rating: {Number(data?.vote_average).toFixed(1)}</p>
                </div>
            </div>

        </Link>
    )
}

export default Card