import React, { useState } from 'react'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'
function forgetPassword() {
    const [step, setStep] = useState(1)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState("")
    const navigate = useNavigate()
    const handleUser = async () => {
        try {
            setLoading(true)
            setError("")
            const res = await api.post('/api/users/login/findUser', { email })
            console.log(res.data.user);
            setStep(2)
        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }
    const handleVerify = async () => {
        try {
            setLoading(true)
            setError("")
            const res = await api.post('/api/users/signup/verify-otp', { email, otp });
            setStep(3)
        } catch (err) {
            setError(err?.response?.data?.message || "Unable to verify OTP")
        } finally {
            setLoading(false)
        }
    }
    const handleForgetPassword = async () => {
        try {
            setLoading(true)
            setError("")
            const res = await api.post('/api/users/login/forgetPass', { email, password, confirmPassword })
            setStep(4)
        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            {/* forget password */}
            {step == 1 && (
                <div>
                    <div className="min-h-screen bg-gradient-to-br from -[#30364F] to-[#2a2f42] flex items-center justify-center">
                        <div className='flex flex-col items-center gap-5 bg-white/5 backdrop-blur-2xl border border-gray-500 rounded-3xl shadow-xl px-10 py-6 w-100  '>
                            <div>
                                <p className='text-yellow-500 tracking-widest text-center text-lg'>
                                    Welcome
                                </p>
                                <h1 className=' text-3xl font-bold mt-5' >Find Account?</h1>
                            </div>
                            <div className='flex flex-col gap-5 w-full mt-5'>
                                <div className='relative '>
                                    <label className=' text-gray-400  text-sm ' htmlFor="email">Email</label>
                                    <input
                                        className='bg-[#2a2f42] py-2 w-full focus:border-gray-50 px-4 border border-gray-400 rounded-xl outline-none '
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                            setError("")
                                        }}
                                        placeholder='Enter your email'
                                        type="email" name="email" id="email"
                                    />
                                </div>
                                <div>
                                    {error && <p className=' font-semibold text-center py-2 px-4 rounded-xl text-rose-500 border border-rose-500'>{error}</p>}
                                </div>
                                <div>
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            handleUser()
                                        }}
                                        className='bg-[#ACBAC4]  text-slate-900 transition hover:bg-[#c8d4dc] w-full py-2 rounded-xl font-semibold text-lg '
                                    >{loading ? "Loading..." : "Verify Your Account?"}</button>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {step == 2 && (
                <div>
                    <div className="min-h-screen bg-gradient-to-br from -[#30364F] to-[#2a2f42] flex items-center justify-center">
                        <div className='flex flex-col items-center gap-5 bg-white/5 backdrop-blur-2xl border border-gray-500 rounded-3xl shadow-xl px-10 py-6 w-100  '>
                            <div>
                                <p className='text-yellow-500 tracking-widest text-center text-lg'>
                                    Welcome
                                </p>
                                <h1 className=' text-4xl font-bold mt-5' >Verify-Account</h1>
                            </div>
                            <div className='flex flex-col gap-5 w-full mt-5'>
                                <div className='relative '>
                                    <label className=' text-gray-400  text-sm tracking-wider ' htmlFor="otp">OTP</label>
                                    <input
                                        className='bg-[#2a2f42] py-2 w-full focus:border-gray-50 px-4 border border-gray-400 rounded-xl outline-none '
                                        value={otp}
                                        onChange={(e) => {
                                            setOtp(e.target.value)
                                            setError("")
                                        }}
                                        placeholder='Enter your otp..'
                                        type="number" name="otp" id="otp"
                                    />
                                </div>
                                <div>
                                    {error && <p className=' font-semibold text-center py-2 px-4 rounded-xl text-rose-500 border border-rose-500'>{error}</p>}
                                </div>
                                <div>
                                    <button
                                        disabled={loading}
                                        onClick={() => { handleVerify() }}
                                        className='bg-[#ACBAC4]  text-slate-900 transition hover:bg-[#c8d4dc] w-full py-2 rounded-xl font-semibold text-lg '
                                    >{loading ? "Verifying..." : "Verify"}</button>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {step == 3 && (
                <div>
                    <div className="min-h-screen bg-gradient-to-br from -[#30364F] to-[#2a2f42] flex items-center justify-center">
                        <div className='flex flex-col items-center gap-5 bg-white/5 backdrop-blur-2xl border border-gray-500 rounded-3xl shadow-xl px-10 py-6 w-100  '>
                            <div>
                                <p className='text-yellow-500 tracking-widest text-center text-lg'>
                                    Welcome
                                </p>
                                <h1 className=' text-4xl font-bold mt-5' >Forget Password</h1>
                            </div>
                            <div className='flex flex-col gap-5 w-full mt-5'>
                                <div className='relative '>
                                    <label className=' text-gray-400  text-sm ' htmlFor="password">Password</label>
                                    <input
                                        className='bg-[#2a2f42] py-2 w-full focus:border-gray-50 px-4 border border-gray-400 rounded-xl outline-none '
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                            setError("")
                                        }}
                                        placeholder='Enter your email'
                                        type="password" name="password" id="password"
                                    />
                                </div>
                                <div className='relative '>
                                    <label className=' text-gray-400  text-sm ' htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        className='bg-[#2a2f42] py-2 w-full focus:border-gray-50 px-4 border border-gray-400 rounded-xl outline-none '
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value)
                                            setError("")
                                        }}
                                        placeholder='Enter your email'
                                        type="confirmPassword" name="confirmPassword" id="confirmPassword"
                                    />
                                </div>
                                <div>
                                    {error && <p className=' font-semibold text-center py-2 px-4 rounded-xl text-rose-500 border border-rose-500'>{error}</p>}
                                </div>
                                <div>
                                    <button
                                        disabled={loading}
                                        onClick={() => { handleForgetPassword() }}
                                        className='bg-[#ACBAC4]  text-slate-900 transition hover:bg-[#c8d4dc] w-full py-2 rounded-xl font-semibold text-lg '
                                    >{loading ? "Forgetting..." : "Forget Password"}</button>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {step == 4 && (
                <div>
                    <div className="min-h-screen bg-gradient-to-br from -[#30364F] to-[#2a2f42] flex items-center justify-center">
                        <div className='flex flex-col items-center gap-5 bg-white/5 backdrop-blur-2xl border border-gray-500 rounded-3xl shadow-xl px-10 py-6 w-100  '>
                            <div>
                                <p className='text-yellow-500 tracking-widest text-center text-lg'>
                                    Welcome
                                </p>
                                <h1 className=' text-4xl font-bold mt-5' >Forget Password</h1>
                            </div>
                            <div className='flex flex-col gap-5 w-full mt-5'>
                                <div>
                                    <p
                                        className='bg-transparent backdrop-blur-2xl py-2 text-center rounded-2xl text-emerald-500 border border-emerald-500 font-semibold'>
                                        Password Reset Successfully..
                                    </p>
                                </div>
                                <div>
                                    <button
                                        disabled={loading}
                                        onClick={() => { navigate("/login") }}
                                        className='bg-[#ACBAC4]  text-slate-900 transition hover:bg-[#c8d4dc] w-full py-2 rounded-xl font-semibold text-lg '
                                    >Login</button>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default forgetPassword
