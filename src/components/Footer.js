import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='text-center py-3 bg-neutral-600'>
      <div className='flex items-center justify-center gap-5'>
        <Link to={"/"}>About</Link>
        <Link to={"/"}>Contact</Link>
      </div>
      <p className='text-sm'>Created By Vũ Hà</p>
    </footer>
  )
}

export default Footer