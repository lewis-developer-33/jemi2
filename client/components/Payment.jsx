import React,{useState} from 'react'
import {GridIcon, XIcon} from 'lucide-react'

const Payment = () => {
    
    const [phone,setPhone] = useState('')
    const [amount,setAmount] = useState('')
    
    const userName = localStorage.getItem("name")
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(user)
    }
  return (
    <div className='flex items-center h-screen relative'>
        <section id='sidebar' className='bg-blue-800 text-white h-screen rounded-r-md flex flex-col pl-4 py-8 font-semibold w-[350px]'>
            <div className='text-xl'>
                Gift Apartment
                <div className=' my-2 border-2 w-full'>

                </div>
            </div>
            <div className='grid gap-4 mt-8 text-lg'>
            <a href="/dashboard">Dashboard</a>
                <a href="/apartments">Apartments</a>
                <a href="/tenants">Tenants</a>
                <a href="/">Notifications</a>
                <a href="/">Maintenance</a>
                <a href="/">Reports</a>
                <a href="/payment">Payment</a>
            </div>
        </section>
        <section className='mx-auto max-w-[4xl] '>
            <div className=' fixed top-8 right-8 flex items-center justify-center p-2 rounded-full h-10 w-10 bg-slate-900 text-white'>
                {username[0]}
            </div>
            <main className='grid gap-5'>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='grid gap-4 w-[340px]'>
                        <input
                        type='text'
                        name='phone'
                        placeholder='Phone'
                        onChange={(e) => setPhone(e.target.value)}
                        className='border-2 px-2 py-1 rounded-sm w-full'
                        />
                        <input
                        type='text'
                        name='amount'
                        placeholder='Amount'
                        onChange={(e) => setAmount(e.target.value)}
                        className='border-2 px-2 py-1 rounded-sm w-full'
                        />
                    </div>
                    <button
                    type='submit' className='border-2 my-2 px-4 py-2 rounded-md border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white '
                    >Request</button>
                </form>
            </div>
            </main>

            
        </section>


        
            
        
    </div>
  )
}



export default Payment