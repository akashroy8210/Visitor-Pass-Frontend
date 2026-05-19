import React, { useState } from 'react'
import api from '../api/api'
function CreateStaff() {
    const [isPhoto, setIsPhoto] = useState(false)
    const [preview, setPreview] = useState({
        image: ""
    })
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        image: "",
        staff: ""
    })
    const [showPassword,setShowPassword]=useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const handleCreateStaff = async () => {
        try {
            setLoading(true)
            setError("")
            setSuccess("")
            const formData = new FormData()
            formData.append("image", profile.image)
            formData.append("name", profile.name)
            formData.append("email", profile.email)
            formData.append("password", profile.password)
            formData.append("phone", profile.phone)
            formData.append("role", profile.staff)
            const res = await api.post('/api/users/admin/addStaff', formData)
            setError("")
            setSuccess(res?.data?.message || "Staff created successfully")
            setProfile({
                name: "",
                email: "",
                phone: "",
                password: "",
                image: "",
                staff: ""
            })
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

    const handleChange = (e) => {
        const { name, value } = e.target
        setProfile({
            ...profile,
            [name]: value
        })
    }
    const handliImageChange = (e) => {
        const image = e.target.files[0]
        if (image) {
            setProfile((prev) => (
                {
                    ...prev,
                    image: image,
                }
            ))
        }
        preview.image = URL.createObjectURL(image)
        console.log(profile, preview.image)
        setIsPhoto(true)
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
                            <div>
                                {!isPhoto ? (
                                    <div className='flex justify-center'>
                                        <div className='bg-gray-700 backdrop-blur-2xl h-25 w-25 rounded-full flex items-center justify-center border  border-gray-300'>
                                            <label className='text-3xl w-25 h-25 flex items-center justify-center' htmlFor="image"><ion-icon name="camera-outline"></ion-icon></label>
                                            <input
                                                onChange={handliImageChange}
                                                type="file" name="image" id="image" hidden />
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex justify-center flex-col items-center gap-1'>
                                        <div className='bg-gray-300 backdrop-blur-2xl h-25 w-25 rounded-full flex items-center justify-center border overflow-hidden border-gray-300'>
                                            <img src={preview.image} alt={profile.name.charAt(0)} />
                                        </div>
                                        <div>
                                            <label className='text-gray-800' htmlFor="image">Change Image</label>
                                            <input
                                                onChange={handliImageChange}
                                                type="file" name="image" id="image" hidden />
                                        </div>
                                    </div>
                                )
                                }
                            </div>
                            <div className='flex w-full justify-between gap-10'>
                                <div className='flex flex-col w-full'>
                                    <label
                                        className='text-gray-500 text-lg font-semibold'
                                        htmlFor="name">Name</label>
                                    <input
                                        value={profile.name}
                                        onChange={handleChange}
                                        className=' input-box'
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
                                        value={profile.email}
                                        onChange={handleChange}
                                        className='input-box'
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder='Enter Staff Email...'
                                    />
                                </div>
                            </div>
                            <div className='flex justify-between gap-10'>
                                <div className='flex flex-col w-full relative'>
                                    <label
                                        className='text-gray-500 text-lg font-semibold'
                                        htmlFor="password">Password</label>
                                    <input
                                        value={profile.password}
                                        onChange={handleChange}
                                        className='input-box'
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        placeholder='Enter Password...'
                                    />
                                    <ion-icon 
                                    className="absolute right-2 top-2/3 -translate-1/2 text-gray-800  "
                                    name={showPassword ? "eye-outline" : "eye-off-outline"} onClick={() => setShowPassword(!showPassword)}></ion-icon>
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label
                                        className='text-gray-500 text-lg font-semibold'
                                        htmlFor="email">Phone</label>
                                    <input
                                        value={profile.phone}
                                        onChange={handleChange}
                                        className='input-box'
                                        type="phone"
                                        name="phone"
                                        id="phone"
                                        placeholder='Enter Staff phone number...'
                                    />
                                </div>

                            </div>
                            <div className='w-full flex flex-col'>
                                <label
                                    className='text-gray-500 text-lg font-semibold '
                                    htmlFor="staff">Select Staff</label>
                                <select
                                    value={profile.staff}
                                    onChange={handleChange}
                                    className='input-box'
                                    name="staff" id="staff">
                                    <option value="">Select Staff</option>
                                    <option value="Employee">Employee</option>
                                    <option value="Security">Security</option>
                                </select>
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
