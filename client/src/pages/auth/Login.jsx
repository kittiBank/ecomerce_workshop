import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom-store';

const Login = () => {
  //Java script

  //Test zustand
  const bankbank = useEcomStore((state)=>state.name)
  console.log(bankbank)

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleOnChange = (even) => {
    // code
    //console.log(even.target.name, even.target.value)

    // Sent value to form
    setForm({
      ...form,
      [even.target.name]: even.target.value
    })
  }

  const handleSubmit = async (even) => {
    even.preventDefault()

    // Send to Backend
    try {
      const res = await axios.post('http://localhost:5000/api/login', form)
      
      console.log(res)
      toast.success(res.data)
    } catch (err) {
      //Response from backend to font
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err)
    }
  }

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        Email
        <input className='border'
          onChange={handleOnChange}
          name='email'
          type='email'
        />

        Password
        <input className='border'
          onChange={handleOnChange}
          name='password'
          type='password'
        />

        <button className='bg-gray-300 rounded-md px-4'>Login</button>

      </form>
    </div>
  )
}

export default Login
