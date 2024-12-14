import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import axios from 'axios'
import Card from '../components/Card';

const ExplorePage = () => {
  const params = useParams();
  const [pageNumber, setPageNumber] = useState(1)
  const [data, setData] = useState([])
  const [totalPageNumber, setTotalPageNumber] = useState(1)

  const param = params.explore;

  const fetchData = async () => {
    try {
      const respone = await axios.get(`/discover/${param}`, {
        params: {
          page: pageNumber
        }
      })
      setData((prev) => {
        return [
          ...prev,
          ...respone.data?.results
        ]

      })
      setTotalPageNumber(respone.data?.total_pages)
    } catch (error) {
      console.log(error)
    }
  }

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 10)) {
      setPageNumber(prev => prev + 1)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pageNumber])

  useEffect(() => {
    setPageNumber(1)
    setData([])
    fetchData()
  }, [params])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className='m-16'>
      <div className='container mx-auto'>
        <h3 className='capitalize text-2xl lg:text-4xl font-bold mb-10'>Popular {params.explore}</h3>

        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-10'>
          {
            data?.map((exploreData,i) => {
              return (
                <Card key={`${i}exploreData:${exploreData?.id}`} data={exploreData} media_type={params.explore} trending={false}/>
              )
            })
          }
        </div>

      </div>
    </div>
  )
}

export default ExplorePage