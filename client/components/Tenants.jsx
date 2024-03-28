import React,{useState,useEffect} from 'react'
import {GridIcon, XIcon} from 'lucide-react'
import axios from 'axios'

const Tenants = () => {
    // const spots = [
    //     {
    //         name:"1A",
    //         type:"Bedsitter",
    //         price:"9000"
    //     },
    //     {
    //         name:"1A",
    //         type:"Bedsitter",
    //         price:"9000"
    //     },
    //     {
    //         name:"1A",
    //         type:"Bedsitter",
    //         price:"9000"
    //     },
    //     {
    //         name:"1A",
    //         type:"Bedsitter",
    //         price:"9000"
    //     },
    //     {
    //         name:"1A",
    //         type:"Bedsitter",
    //         price:"9000"
    //     },
    // ]
    const [spots,setSpots] = useState([])
    useEffect(() => {
        const fetchApartments = async () => {
            const res = await axios.get("http://localhost:8000/users")
            setSpots(res.data.users)
        }
        fetchApartments()
    },[])
    const userName = localStorage.getItem("name")
    const [create,setCreate] = useState(false)
    const [edit,setEdit] = useState(false)
    const [selected,setSelected] = useState({})
    const inputs = [
        {
          name:'name',
          type:'text',
          placeholder:"Name"
        },
        {
          name:'email',
          type:'email',
          placeholder:"Email"
        },
        
      ]
      const [user,setUser] = useState()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

 
    const handleCreate = async () => {
        const res = await axios.post('http://localhost:8000/users',user)
        if (res.data.message) setMessage(res.data.message)
        else setError(res.data.error)
    }
    // const handleUpdate = async () => {
    //     const id = selected.i
    //     const res = await axios.post(`http://localhost:8000/apartment/${id}`,user)
    //     if (res.data.message) setMessage(res.data.message)
    //     else setError(res.data.error)
    // }
    const handleDelete = async () => {
        const id = selected.i
        const res = await axios.delete(`http://localhost:8000/users/${id}`)
        if (res.data.message) setMessage(res.data.message)
        else setError(res.data.error)
    }

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
                {userName[0]}
            </div>
            <main className='grid gap-5'>
                <button 
                onClick={() => setCreate(true)}
                className='bg-slate-900 text-white px-4 py-2 rounded-sm font-semibold fixed top-20 left-[500px]'>Create</button>    
                <input
                type='text'
                placeholder='Search here...'
                className='border-2 px-4 font-semibold py-2 rounded-sm '
                />
                <div className='w-[700px] grid gap-4 my-4'>
                    {spots.map((d,i) => {
                        const {name,type,price} = d
                        return(
                            <div key={i} className='px-4 py-2 rounded-sm shadow-sm hover:bg-slate-900 hover:text-white flex items-center justify-between w-full font-semibold'>
                                <div>{name}</div>
                                <div className='grid gap-1'>
                                    <div>{type}</div>
                                    <div className='text-sm'>{price}</div>
                                </div>
                                <GridIcon onClick={() => {
                                    setSelected(name,type,price)
                                    setEdit(true)
                                }} className='cursor-pointer hover:text-blue-800'/>
                            </div>
                        )
                    })}
                </div>
            {create && (<div className='p-7 bg-slate-900/80 fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center'>
            <form onSubmit={handleCreate} className='border-2 bg-white shadow-md rounded-sm p-5 grid gap font-semibold w-[400px]'>
                <h2 className='text-xl my-2'>Gift - Create Apartment</h2>
                <XIcon onClick={() =>setCreate(false)} className='cursor-pointer '/>
                <div className='grid gap-3 w-full'>
                {inputs.map((d,i) => {
                    const {name,type,placeholder} = d
                    return(
                    <div key={i}>
                        <p className='text-capitalize'>{placeholder}</p>
                        <input
                        onChange={handleChange}
                        className='border-2 px-2 py-1 rounded-sm w-full'
                        type={type}
                        name={name}
                        />
                    </div>
                    )
                })}
                <select name="type" 
                onSelect={(value) => setUser(prevState => ({...prevState,"type":value}))}
                className='w-full px-2 py-1 border-2' >
                    <option value="bedsitter">Bedsitter</option>
                    <option value="one-bedroom">One Bedroom</option>
                </select>
                </div>
                <div className='mt-4'>
                <button type='submit' className='border-2 px-4 py-2 rounded-md border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white '>Create</button>
                </div>
            </form>
            </div>)}
            {edit && (<div className='p-7 bg-slate-900/80 fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center'>
            <form 
            className='border-2 bg-white shadow-md rounded-sm p-5 grid gap font-semibold w-[400px]'>
                <h2 className='text-xl my-2'>Gift - Edit Apartment</h2>
                <XIcon onClick={() =>setEdit(false)} className='cursor-pointer '/>
                <div className='grid gap-3 w-full'>
                {inputs.map((d,i) => {
                    const {name,type,placeholder} = d
                    return(
                    <div key={i}>
                        <p className='text-capitalize'>{placeholder}</p>
                        <input
                        onChange={handleChange}
                        className='border-2 px-2 py-1 rounded-sm w-full'
                        type={type}
                        name={name}
                        />
                    </div>
                    )
                })}
                <select name="type" 
                onSelect={(value) => setUser(prevState => ({...prevState,"type":value}))}
                className='w-full px-2 py-1 border-2' >
                    <option value="bedsitter">Bedsitter</option>
                    <option value="one-bedroom">One Bedroom</option>
                </select>
                </div>
                <div className='mt-4'>
                {/* <button type='submit' className='border-2 px-4 py-2 rounded-md border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white '>Create</button> */}
                <button onClick={handleDelete} className='border-2 px-4 py-2 rounded-md border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white '>Delete</button>
                </div>
            </form>
            </div>)}
            </main>

            
        </section>


        
            
        
    </div>
  )
}



export default Tenants