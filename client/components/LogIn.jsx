import React,{useState} from 'react'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import {Link, useNavigate} from 'react-router-dom'

const LogIn = () => {
  const inputs = [
    {
      name:'email',
      type:'email',
      placeholder:"Email"
    },
    {
      name:'password',
      type:'password',
      placeholder:"Password"
    },
  ]

  const [user,setUser] = useState()
  const navigate = useNavigate()
  const [message,setMessage] = useState("")
  const [error,setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
        ...prevState,
        [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post("http://localhost:8000/log-in",user)
    console.log(response.data)
    if (response.data.message) {
      setMessage(response.data.message)
      localStorage.setItem('name',response.data.message.name)
      localStorage.setItem('email',response.data.message.email)
      navigate('/dashboard')
    }
    else {
      setError(response.data.error)
    }
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <form onSubmit={handleSubmit} className='border-2 shadow-md rounded-sm p-5 grid gap font-semibold w-[400px]'>
      {message.length > 1 && (
          <Alert severity="info">{message}</Alert>
        )}
        {error.length > 1 && (
          <Alert severity="danger">{error}</Alert>
        )}
        <h2 className='text-xl my-2'>Gift Apartment - Sign up</h2>
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
          
        </div>
        <div className='mt-4'>
          <button type='submit' className='border-2 px-4 py-2 rounded-md border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white '>Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default LogIn