import React from 'react'

const Navbar = () => {
  return (

    <nav className="bg-slate-800 text-white fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-3 lg:py-6 h-16 lg:h-20 font-bold">

        <div className="logo text-white text-2xl sm:text-3xl flex items-center gap-1">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </div>


        <button className="text-white bg-green-700 rounded-full flex items-center ring-white ring-1 hover:cursor-pointer px-5 sm:px-6 py-2 sm:py-2.5 text-base sm:text-lg hover:bg-green-600 transition-all">
          <img
            className="invert w-7 sm:w-8 p-1"
            src="https://www.svgrepo.com/show/394174/github.svg"
            alt="github logo"
          />
          <span className="font-bold px-2">GitHub</span>
        </button>
      </div>
    </nav>


  )
}

export default Navbar

