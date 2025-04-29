import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const Register = () => {
  //Java script
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
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
    if (form.password !== form.confirmPassword) {
      return alert('Confirm Passowrd is not match')
    }
    console.log(form)
    // Send to Backend
    try {
      const res = await axios.post('http://localhost:5000/api/register', form)
      
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
      Register
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

        Confirm Password
        <input className='border'
          onChange={handleOnChange}
          name='confirmPassword'
          type='password'
        />

        <button className='bg-gray-300 rounded-md px-4'>Register</button>

      </form>
    </div>
  )
}

export default Register
