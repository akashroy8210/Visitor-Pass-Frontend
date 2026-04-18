import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'

function SignupPage() {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      setLoading(true)
      setError("")
      setSuccess("")
      await api.post('/api/users/signup', { name: userName, email, password })
      setStep(2)
      setSuccess("OTP sent to your email. Please verify your account.")
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    try {
      setLoading(true)
      setError("")
      setSuccess("")
      const res = await api.post('/api/users/signup/verify-otp', { email, otp })
      localStorage.setItem("token",res.data.token)
        localStorage.setItem("user",JSON.stringify({
          _id:res.data.user._id,
          name:res.data.user.name,
          role:res.data.user.role,
          email:res.data.user.email
        }))
      setSuccess("Account verified successfully.")
      navigate(`/users/${res.data.user.role.toLowerCase()}`)
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to verify OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {step === 1 ? (
        <div className='min-h-screen bg-gradient-to-br from -[#30364F] to-[#2a2f42] flex items-center justify-center'>
          <div className='flex w-full max-w-md flex-col h-130 items-center gap-5 rounded-3xl border border-gray-500 bg-white/5 px-10 py-6 shadow-xl backdrop-blur-2xl'>
            <div>
              <p className='text-center text-lg tracking-widest text-yellow-500'>
                Welcome
              </p>
              <h1 className='mt-5 text-4xl font-bold'>Create Account</h1>
            </div>

            <div className='mt-5 flex w-full flex-col gap-5'>
              <div className='relative'>
                <label className='text-sm text-gray-400' htmlFor="name">
                  UserName
                </label>
                <input
                  className='w-full rounded-xl border border-gray-400 bg-[#2a2f42] px-4 py-2 outline-none transition duration-300 focus:border-gray-50'
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value)
                    setError("")
                  }}
                  type="text"
                  name="name"
                  id="name"
                />
              </div>

              <div className='relative'>
                <label className='text-sm text-gray-400' htmlFor="email">
                  Email
                </label>
                <input
                  className='w-full rounded-xl border border-gray-400 bg-[#2a2f42] px-4 py-2 outline-none focus:border-gray-50'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError("")
                  }}
                  type="email"
                  name="email"
                  id="email"
                />
              </div>

              <div className='relative'>
                <label className='text-sm text-gray-400' htmlFor="password">
                  Password
                </label>
                <input
                  className='w-full rounded-xl border border-gray-400 bg-[#2a2f42] px-4 py-2 outline-none focus:border-gray-50'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                  type="password"
                  name="password"
                  id="password"
                />
              </div>

              {error && (
                <p className='rounded-xl border border-rose-200 bg-rose-100 px-4 py-2 text-center font-semibold text-rose-500'>
                  {error}
                </p>
              )}

              <div>
                <button
                  disabled={loading}
                  onClick={handleSignup}
                  className='w-full rounded-xl bg-[#ACBAC4] py-2 text-lg font-semibold text-slate-900 transition hover:bg-[#c8d4dc] disabled:cursor-not-allowed disabled:opacity-70'
                >
                  {loading ? "Creating..." : "Signup"}
                </button>
              </div>

              <div>
                <p className='flex justify-center gap-2 text-sm text-gray-300'>
                  <span>Already Have an Account?</span>
                  <Link
                    className='font-semibold text-cyan-300 hover:text-cyan-200'
                    to='/login'
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex w-full max-w-md flex-col items-center h-130 gap-5 rounded-3xl border border-gray-500 bg-white/5 px-10 py-8 shadow-xl backdrop-blur-2xl'>
          <div className='text-center'>
            <p className='text-center text-lg tracking-widest text-yellow-500'>
              Welcome
            </p>
            <h1 className='mt-5 text-4xl font-bold'>Verify OTP</h1>
            <p className='mt-3 text-sm text-gray-300'>
              Enter the OTP sent to <span className='font-semibold text-cyan-300'>{email}</span>
            </p>
          </div>

          <div className='mt-4 flex w-full flex-col gap-5'>
            <div className='relative'>
              <label className='text-sm text-gray-400' htmlFor="otp">
                OTP Code
              </label>
              <input
                className='w-full rounded-xl border border-gray-400 bg-[#2a2f42] px-4 py-3 text-center text-lg tracking-[0.5em] outline-none transition duration-300 focus:border-gray-50'
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value)
                  setError("")
                }}
                type="text"
                name="otp"
                id="otp"
                maxLength={6}
              />
            </div>

            {success && (
              <p className='rounded-xl border border-emerald-200 bg-emerald-100 px-4 py-2 text-center font-semibold text-emerald-600'>
                {success}
              </p>
            )}

            {error && (
              <p className='rounded-xl border border-rose-200 bg-rose-100 px-4 py-2 text-center font-semibold text-rose-500'>
                {error}
              </p>
            )}

            <div>
              <button
                disabled={loading}
                onClick={handleVerifyOtp}
                className='w-full rounded-xl bg-[#ACBAC4] py-2 text-lg font-semibold text-slate-900 transition hover:bg-[#c8d4dc] disabled:cursor-not-allowed disabled:opacity-70'
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setStep(1)
                setOtp("")
                setError("")
                setSuccess("")
              }}
              className='text-sm font-semibold text-cyan-300 transition hover:text-cyan-200'
            >
              Back to signup
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignupPage
