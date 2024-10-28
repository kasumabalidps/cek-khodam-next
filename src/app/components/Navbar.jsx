import React from 'react'

function Navbar() {
  return (
    <div className="max-w-6xl mx-auto py-8 flex justify-start gap-x-5 items-center p-4">
        <h1 className="text-2xl font-bold text-center uppercase text-white underline underline-offset-4 decoration-2">Cek Khodam</h1>
        <ul className="flex gap-x-5 justify-center text-white">
            <li className="font-bold">Cek Khodam</li>
            <li className='font-regular'>Developer</li>
        </ul>
    </div>
  )
}

export default Navbar