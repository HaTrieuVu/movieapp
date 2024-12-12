import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.png"
import user from "../assets/user.png"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { IoSearchOutline} from "react-icons/io5";
import { navigation } from '../contants/navigation';



const Header = () => {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(searchInput) {
            navigate(`/search?q=${searchInput}`);
        }
      
    }, [searchInput])
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

  return (
    <header className='fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-75'>
        <div className='container mx-auto px-2 flex items-center h-full'>
            <Link to={"/"}>
                <img src={logo} alt="logo" width={120} />
            </Link>

            <nav className='hidden lg:flex items-center gap-2 ml-5'>
                {
                    navigation.map((nav, i) => {
                        return (
                            <div key={nav.label}>
                                <NavLink 
                                    to={nav.href} 
                                    className={({isActive}) => `px-2 hover:text-neutral-400 ${isActive && "text-neutral-400"}`}>
                                    {nav.label}
                                </NavLink>
                            </div>
                        )
                    })
                }
            </nav>

            <div className='ml-auto flex items-center gap-4'>
                <form className='flex items-center' onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder='Search here... ' 
                        className='bg-transparent px-4 py-1 outline-none hidden lg:block' 
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        name="" id="" 
                    />
                    <button className='text-2xl text-white cursor-pointer p-1'>
                        <IoSearchOutline />
                    </button>
                </form>
                
                <div className='w-10 h-10 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all'>
                    <img src={user} className='w-full h-full' alt="User" />
                </div>
            </div>
        </div>



    </header>
  )
}

export default Header