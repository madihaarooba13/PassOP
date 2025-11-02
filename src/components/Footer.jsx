import React from 'react'

const Footer = () => {
    return (
        <>

            <div className='fixed bottom-0 bg-slate-800 text-white flex flex-col justify-center items-center  w-full'>
                <div className="logo font-bold text-white text-2xl">
                    <span className='text-green-500'> &lt;</span>

                    <span>Pass</span><span className='text-green-500'>OP/&gt;</span>


                </div>
                <div className='flex justify-center items-center'> Created with <img className='w-7 mx-2' src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/2048px-Heart_coraz%C3%B3n.svg.png" alt="" /> by MadihaArooba </div>
            </div>
        </>
    )
}

export default Footer