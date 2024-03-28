import React from 'react'

const Listing = () => {
  return (
    <>
        <header className='px-4 py-4 shadow-md rounded-b-md flex items-center justify-between font-semibold text-lg'>
            <div>
                Sagana State TBS
            </div>
            <div className='flex items-center gap-4'>
                <a href="/">Recommendations</a>
                <a href="/">Listings</a>
                <a href="/">Profile</a>
            </div>
            <div className='flex items-center justify-center p-2 rounded-full h-10 w-10 bg-slate-900 text-white'>
                L
            </div>
        </header>
        <section className='mx-auto max-w-[4xl] p-8 grid grid-cols-4'>
            
        </section>
    </>
  )
}

export default Listing