import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'

const SearchPage = () => {
  const location = useLocation()

  const [pageNumber, setPageNumber] = useState(1)
  const [totalPageNumber, setTotalPageNumber] = useState(1)
  const [data, setData] = useState([])

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const respone = await axios.get(`/search/multi`, {
        params: {
          query: location?.search?.slice(3),
          page: pageNumber
        }
      })
      console.log(respone)
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

  useEffect(() => {
    fetchData()
  }, [pageNumber])

  useEffect(() => {
    setData([])
    setPageNumber(1)
    fetchData()
  }, [location])
  
  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 10)) {
      setPageNumber(prev => prev + 1)
    }
  }

   useEffect(() => {
      window.addEventListener("scroll", handleScroll)
    }, [])
  

  return (
    <div className='my-16'>

      <div className='lg:hidden sticky top-20 z-30 px-3'>
        <input type="text" name="" id="" 
          placeholder='Search here..'
          value={location?.search?.slice(3).split("%20").join(" ")}
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          className='py-3 w-full mb-8 text-2xl text-black px-3 rounded-3xl outline-none'
        />

        <h2 className='capitalize text-2xl lg:text-4xl font-bold mb-10'>Search Results</h2>

      </div>

      <div className='container mx-auto'>
        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-10 justify-center'>
          {
            data?.map((searchData,i) => {
              return (
                <Card key={`${i}searchData:${searchData?.id}`} data={searchData} media_type={searchData?.media_type} trending={false}/>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default SearchPage