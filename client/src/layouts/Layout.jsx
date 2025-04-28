import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <h1>Main Nav</h1>
      <hr/>
      
      {/* Show parent layout */}
      <Outlet /> 
    </div>
  )
}

export default Layout
