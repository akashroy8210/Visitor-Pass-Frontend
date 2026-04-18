import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from "../api/api"
function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState("")
  const navigate=useNavigate()
  const handleLogin=async()=>{
      try{
        setLoading(true)
        const res=await api.post('/api/users/login',{email,password})
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("user",JSON.stringify({
          _id:res.data.user._id,
          name:res.data.user.name,
          role:res.data.user.role,
          email:res.data.user.email
        }))
        navigate(`/users/${res.data.user.role.toLowerCase()}`)
      }catch(err){
        setLoading(false)
        setError(err.response.data.message)
        console.log(err.response.data.message)
      }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from -[#30364F] to-[#2a2f42] flex items-center justify-center">
      <div className='flex flex-col items-center gap-5 bg-white/5 backdrop-blur-2xl border border-gray-500 rounded-3xl shadow-xl px-10 py-6 w-100  '>
        <div>
          <p className='text-yellow-500 tracking-widest text-center text-lg'>
            Welcome
            </p>
          <h1 className=' text-4xl font-bold mt-5' >Login</h1>
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
              type="email" name="email" id="email"
            />
          </div>
          <div className='relative '>
            <label className=' text-gray-400  text-sm ' htmlFor="password">Password</label>
            <input
              className= 'bg-[#2a2f42] w-full py-2 px-4  focus:border-gray-50 border border-gray-400 rounded-xl outline-none '
              value={password}
              onChange={(e) =>{
                setPassword(e.target.value)
                setError("")
              }}
              type="password" name="password" id="password"
            />
          </div>
          <div>
            {error && <p className='bg-rose-100 font-semibold border-rose-500 text-center py-2 px-4 rounded-xl text-rose-500 border border-rose-200'>{error}</p>}
          </div>
          <div>
            <button
            disabled={loading}
            onClick={handleLogin}
            className='bg-[#ACBAC4]  text-slate-900 transition hover:bg-[#c8d4dc] w-full py-2 rounded-xl font-semibold text-lg '
            >{loading ? "Loading..." : "Login"}</button>
          </div>
          <div>
            <p className='text-sm text-gray-300 flex gap-2 justify-center'>
              <span>Don't Have an Account?</span>
              <Link 
              className='font-semibold text-cyan-300 hover:text-cyan-200'
              to='/' >Create Account</Link>
              </p>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
