import React from 'react'
import { mobileNavigation } from '../contants/navigation'
import { NavLink } from 'react-router-dom'

const MobileNavigation = () => {
  return (
    <section className='lg:hidden h-14 bg-neutral-600 bg-opacity-40 fixed bottom-0 w-full px-3 sm:px-20 md:px40'>
        <div className='flex items-center justify-between'>
            {mobileNavigation.map((nav, index) => {
                return (
                    <NavLink 
                        to={nav.href} 
                        className={({isActive}) => `flex flex-col gap-1 items-center text-white ${isActive && "text-red-400"}` } 
                        key={nav.label + "mobileNavigation"} 
                    >
                        <div className='text-2xl' >{nav.icon}</div>
                        <p>{nav.label}</p>
                    </NavLink>
                )
            })}
        </div>
    </section>
  )
}

export default MobileNavigation