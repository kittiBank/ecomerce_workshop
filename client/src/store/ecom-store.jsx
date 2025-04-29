import { create } from 'zustand'

const ecomStore = () => ({
    name: 'Bank',
    value: 0
})

const useEcomStore = create(ecomStore) 

export default useEcomStore