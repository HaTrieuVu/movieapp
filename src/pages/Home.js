import React from 'react'
import BannerHome from '../components/BannerHome'

import { useSelector } from 'react-redux'
import HorizontalScollCard from '../components/HorizontalScollCard'
import useFetch from '../hooks/useFetch'


const Home = () => {
  const trendingData = useSelector(state => state.movieoData.bannerData)
  const { data: nowPlayingData } = useFetch("/movie/now_playing")
  const { data: topRateData } = useFetch("/movie/top_rated")
  const { data: popularTvShowData } = useFetch("/tv/popular")
  const { data: topRateTvShowData } = useFetch("/tv/top_rated")


  console.log(trendingData)
  console.log(topRateData)

  return (
    <div>
      <BannerHome />
      <HorizontalScollCard data={trendingData} titleHeading={"Trending Show"} />
      <HorizontalScollCard data={nowPlayingData} titleHeading={"Now Playing"} trending={false} />
      <HorizontalScollCard data={topRateData} titleHeading={"Top Rated Movies"} trending={false} />
      <HorizontalScollCard data={popularTvShowData} titleHeading={"Popular TV Show"} trending={false} />
      <HorizontalScollCard data={topRateTvShowData} titleHeading={"Top Rate TV Show"} trending={false} />

    </div>
  )
}

export default Home