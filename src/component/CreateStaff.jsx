import React, { useState } from 'react'
import api from '../api/api'
function CreateStaff() {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [staff, setStaff] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const handleCreateStaff = async () => {

        try {
            setLoading(true)
            setError("")
            setSuccess("")
            const res = await api.post('/api/users/admin/addStaff', {
                email,
                name,
                password,
                role: staff
            })
            setError("")
            setSuccess(res?.data?.message || "Staff created successfully")
            setEmail("")
            setName("")
            setPassword("")
            setStaff("")

        } catch (err) {
            console.log("full error:", err)
            console.log("status:", err?.response?.status)
            console.log("data:", err?.response?.data)
            setError(err?.response?.data?.message || "Unable to create staff")
            setSuccess("")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='min-h-screen bg-[#F7FAFF] py-10 '>
            <div className='w-3/5 mx-auto flex flex-col gap-10'>
                <div>
                    <h1 className='text-gray-800 text-3xl tracking-wider font-bold'>Staff</h1>
                </div>
                <div className='bg-[#FBFDFF] px-8 py-5 rounded-2xl shadow-md border border-gray-300'>
                    <div>
                        <p className='text-gray-500 font-semibold tracking-widest'>New staff</p>
                        <h3 className='text-gray-800 text-3xl font-semibold text-shadow-mauve-700 my-2' >Create Staff</h3>
                    </div>
                    <div>
                        <form
                            className='flex flex-col gap-5'
                            action="">
                            <div className='flex w-full justify-between gap-10'>
                                <div className='flex flex-col w-full'>
                                    <label
                                        className='text-gray-500 text-lg font-semibold'
                                        htmlFor="name">Name</label>
                                    <input
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                            setError("")
                                        }}
                                        className='bg-white py-2 px-4 text-gray-800 outline-none  text-lg rounded-2xl'
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder='Enter UserName...'
                                    />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label
                                        className='text-gray-500 text-lg font-semibold'
                                        htmlFor="email">Email</label>
                                    <input
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                            setError("")
                                        }}
                                        className='bg-white py-2 px-4  outline-none text-lg text-gray-800 rounded-2xl'
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder='Enter Staff Email...'
                                    />
                                </div>
                            </div>
                            <div className='flex justify-between gap-10'>
                                <div className='flex flex-col w-full'>
                                    <label
                                        className='text-gray-500 text-lg font-semibold'
                                        htmlFor="password">Password</label>
                                    <input
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                            setError("")
                                        }}
                                        className='bg-white py-2 px-4 text-gray-800 outline-none rounded-2xl'
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder='Enter Password...'
                                    />
                                </div>
                                <div className='w-full flex flex-col'>
                                    <label
                                        className='text-gray-500 text-lg font-semibold '
                                        htmlFor="staff">Select Staff</label>
                                    <select
                                        value={staff}
                                        onChange={(e) => {
                                            setStaff(e.target.value)
                                            setError("")
                                        }}
                                        className='text-gray-800 text-lg outline-none bg-white py-2 rounded-2xl px-4'
                                        name="staff" id="staff">
                                        <option value="">Select Staff</option>
                                        <option value="Employee">Employee</option>
                                        <option value="Security">Security</option>
                                    </select>
                                </div>
                            </div>
                            <button
                                type='button'
                                disabled={loading}
                                onClick={handleCreateStaff}
                                className='text-white bg-gray-800 py-3 rounded-2xl cursor-pointer w-fit px-15 hover:bg-gray-700 font-semibold tracking-wide mt-5 disabled:cursor-not-allowed disabled:opacity-70'
                            >{loading ? "Creating..." : "Create Staff"}</button>

                        </form>
                    </div>
                </div>
                {error && <p className='bg-rose-50 text-rose-700 border border-rose-600 text-center text-lg py-4 rounded-2xl mt-5'>{error}</p>}
                {success && <p className='bg-emerald-100 text-emerald-700 border border-emerald-600 text-center text-lg py-4  rounded-2xl mt-5'>{success}</p>}
            </div>
        </div>
    )
}

export default CreateStaff
