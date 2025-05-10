import React, { useState, useEffect } from 'react'
import useEcomStore from '../store/ecom-store'
import { currentAdmin } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'

const ProtectRouteAdmin = ({ element }) => {
    const [ok, setOK] = useState(false)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)

    console.log('User:', user)
    console.log('Token:', token)

    useEffect(() => {
        if (user && token) {
            //Send to back
            currentAdmin(token)
                .then((res) => setOK(true))
                .catch((err) => setOK(false))
        }
    }, [])

    return ok ? element : <LoadingToRedirect />
}

export default ProtectRouteAdmin
