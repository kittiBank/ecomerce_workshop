import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom-store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  //Java script
  const navigate = useNavigate()
  const actionLogin = useEcomStore((state) => state.actionLogin)
  const user = useEcomStore((state) => state.user)
  console.log('user form zustand', user)

  //Test zustand
  const bankbank = useEcomStore((state) => state.name)

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
      const res = await actionLogin(form)
      const role = res.data?.paylode?.role
      roleRedirect(role)
      toast.success('Welcome Back')

    } catch (err) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }
  }

  const roleRedirect = (role) => {
    console.log('test')
    if (role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/user')
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
