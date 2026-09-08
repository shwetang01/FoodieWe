import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import {  setCurrentAddress, setCurrentCity, setCurrentState, setUserData } from '../redux/userSlice'
import { setAddress, setLocation } from '../redux/mapSlice'

function useGetCity() {
    const dispatch=useDispatch()
    const {userData, currentCity}=useSelector(state=>state.user)
    const apiKey=import.meta.env.VITE_GEOAPIKEY
    useEffect(()=>{
        const fallbackToDefault = () => {
            if (!currentCity) {
                dispatch(setCurrentCity("Varanasi"))
                dispatch(setCurrentState("Uttar Pradesh"))
                dispatch(setCurrentAddress("Assi Ghat, Varanasi"))
                dispatch(setLocation({lat: 25.3176, lon: 82.9739}))
                dispatch(setAddress("Assi Ghat, Varanasi"))
            }
        }

        if (!navigator.geolocation) {
            fallbackToDefault()
            return
        }

        navigator.geolocation.getCurrentPosition(
            async (position)=>{
                try {
                    const latitude=position.coords.latitude
                    const longitude=position.coords.longitude
                    dispatch(setLocation({lat:latitude,lon:longitude}))
                    if (apiKey) {
                        const result=await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`)
                        const city = result?.data?.results?.[0]?.city || result?.data?.results?.[0]?.county || "Varanasi"
                        dispatch(setCurrentCity(city))
                        dispatch(setCurrentState(result?.data?.results?.[0]?.state || "Uttar Pradesh"))
                        dispatch(setCurrentAddress(result?.data?.results?.[0]?.address_line2 || result?.data?.results?.[0]?.address_line1 || city))
                        dispatch(setAddress(result?.data?.results?.[0]?.address_line2 || city))
                    } else {
                        fallbackToDefault()
                    }
                } catch (err) {
                    console.warn("Reverse geocode failed, using default:", err)
                    fallbackToDefault()
                }
            },
            (error) => {
                console.warn("Geolocation denied or timed out:", error.message)
                fallbackToDefault()
            },
            { timeout: 5000, enableHighAccuracy: false }
        )
    },[userData])
}

export default useGetCity
