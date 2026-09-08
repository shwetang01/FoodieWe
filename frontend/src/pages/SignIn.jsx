import React from 'react'
import { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function SignIn() {
    const primaryColor = "#ff4d2d";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";
    const [showPassword, setShowPassword] = useState(false)
    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [err,setErr]=useState("")
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch()

    const demoAccounts = [
        { roleName: "Customer", email: "customer@foodiewe.com", icon: "🧑", badge: "User" },
        { roleName: "Restaurant Owner", email: "owner@foodiewe.com", icon: "👨‍🍳", badge: "Owner" },
        { roleName: "Delivery Boy", email: "delivery@foodiewe.com", icon: "🛵", badge: "Delivery" }
    ];

    const handleSignIn=async () => {
        setLoading(true)
        try {
            const result=await axios.post(`${serverUrl}/api/auth/signin`,{
                email,password
            },{withCredentials:true})
            dispatch(setUserData(result.data))
            setErr("")
            setLoading(false)
        } catch (error) {
            setErr(error?.response?.data?.message || "Sign in failed")
            setLoading(false)
        }
    }

    const handleDemoLogin = async (demoEmail) => {
        setEmail(demoEmail)
        setPassword("password123")
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signin`, {
                email: demoEmail,
                password: "password123"
            }, { withCredentials: true })
            dispatch(setUserData(result.data))
            setErr("")
            setLoading(false)
        } catch (error) {
            setErr(error?.response?.data?.message || "Demo login failed")
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
            <div className='bg-white rounded-2xl shadow-lg w-full max-w-md p-6 sm:p-8 border-[1px]' style={{
                border: `1px solid ${borderColor}`
            }}>
                <h1 className='text-3xl font-bold mb-2' style={{ color: primaryColor }}>FoodieWe</h1>
                <p className='text-gray-600 mb-6 text-sm'>Sign in to your account to get started with delicious food deliveries</p>

                {/* email */}
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-gray-700 font-medium mb-1 text-sm'>Email</label>
                    <input 
                        type="email" 
                        className='w-full border rounded-lg px-3 py-2 text-sm focus:outline-none' 
                        placeholder='Enter your Email' 
                        style={{ border: `1px solid ${borderColor}` }} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        value={email} 
                        required
                    />
                </div>

                {/* password*/}
                <div className='mb-4'>
                    <label htmlFor="password" className='block text-gray-700 font-medium mb-1 text-sm'>Password</label>
                    <div className='relative'>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            className='w-full border rounded-lg px-3 py-2 text-sm focus:outline-none pr-10' 
                            placeholder='Enter your password' 
                            style={{ border: `1px solid ${borderColor}` }} 
                            onChange={(e)=>setPassword(e.target.value)} 
                            value={password} 
                            required
                        />
                        <button 
                            type="button" 
                            className='absolute right-3 cursor-pointer top-[11px] text-gray-500' 
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                    </div>
                </div>

                <div className='text-right mb-4 cursor-pointer text-[#ff4d2d] font-medium text-sm' onClick={()=>navigate("/forgot-password")}>
                    Forgot Password
                </div>

                <button 
                    className='w-full font-semibold py-2.5 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer shadow-md' 
                    onClick={handleSignIn} 
                    disabled={loading}
                >
                    {loading ? <ClipLoader size={20} color='white'/> : "Sign In"}
                </button>

                {err && <p className='text-red-500 text-center my-[10px] text-sm'>*{err}</p>}

                {/* 1-Click Demo Logins for each role */}
                <div className='mt-6 p-4 bg-orange-50/70 border border-orange-200 rounded-2xl text-left'>
                    <div className='flex items-center justify-between mb-3'>
                        <span className='text-xs font-bold uppercase text-[#ff4d2d] tracking-wider'>⚡ 1-Click Demo Logins</span>
                        <span className='text-[10px] text-gray-500 font-mono'>Password: password123</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {demoAccounts.map((demo) => (
                            <button
                                key={demo.roleName}
                                type='button'
                                onClick={() => handleDemoLogin(demo.email)}
                                className='w-full flex items-center justify-between px-3 py-2 bg-white hover:bg-orange-100/50 border border-orange-200/80 rounded-xl transition duration-150 cursor-pointer text-left shadow-sm group'
                            >
                                <div className='flex items-center gap-2.5'>
                                    <span className='text-lg'>{demo.icon}</span>
                                    <div>
                                        <div className='text-xs font-semibold text-gray-800 group-hover:text-[#ff4d2d] transition-colors'>
                                            {demo.roleName}
                                        </div>
                                        <div className='text-[11px] text-gray-500 font-mono'>
                                            {demo.email}
                                        </div>
                                    </div>
                                </div>
                                <span className='text-[11px] font-medium bg-orange-100 text-[#ff4d2d] px-2.5 py-1 rounded-full group-hover:bg-[#ff4d2d] group-hover:text-white transition'>
                                    Login →
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <p className='text-center mt-6 cursor-pointer text-sm text-gray-600' onClick={()=>navigate("/signup")}>
                    Want to create a new account? <span className='text-[#ff4d2d] font-medium'>Sign Up</span>
                </p>
            </div>
        </div>
    )
}

export default SignIn
