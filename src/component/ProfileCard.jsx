import React from 'react'

function ProfileCard() {
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div className='min-h-screen py-10 bg-[#F7FAFF]'>
      <div className='w-2/4 flex  mx-auto flex-col gap-10'>
        {/* heading   */}
        <div>
          <h3 className='text-gray-700 text-4xl font-bold'>Profile</h3>
          <p className='text-gray-500 text-lg tracking-wider'>Manage your personal information</p>
        </div>
        {/* //profile information */}
        <div className='bg-[#FBFDFF] px-5 py-8 rounded-2xl border flex flex-col gap-5 border-gray-300'>

          <div className='flex flex-col items-center gap-2 justify-center'>
            {/* image name role */}
            <div className='w-25 h-25 bg-cyan-100 rounded-full flex items-center justify-center '>
              <p className='text-gray-800 font-bold'>{user.name? user.name.charAt(0):"U" }</p>
            </div>
            <div className='text-center'>
              <h3 className='text-gray-700 text-2xl font-bold'>{user.name}</h3>
              <p className='text-gray-500 tracking-widest'>{user.role}</p>
            </div>
          </div>
          {/* name */}
          <div className=' bg-gray-100 border border-gray-300  rounded-2xl px-5 py-5'>
              <div className='text-gray-700 text-lg flex items-center font-bold gap-3'>
                <span><ion-icon name="person-outline"></ion-icon></span>
                <span>Full Name</span>
              </div>
              <p className='text-gray-700 font-bold tracking-wide'>{user.name}</p>
          </div>
          <div className=' bg-gray-100 border border-gray-300  rounded-2xl px-5 py-5'>
              <div className='text-gray-700 text-lg flex items-center font-bold gap-3'>
                <span><ion-icon name="mail-outline"></ion-icon></span>
                <span>Email</span>
              </div>
              <p className='text-gray-700 font-bold tracking-wide'>{user.email}</p>
          </div>
          <div className=' bg-gray-100 border border-gray-300  rounded-2xl px-5 py-5'>
              <div className='text-gray-700 text-lg flex items-center font-bold gap-3'>
                <span><ion-icon name="call-outline"></ion-icon></span>
                <span>Phone</span>
              </div>
              <p className='text-gray-700 font-bold tracking-wide'>{user.phone ? user.phone : "Not Available"}</p>
          </div>
          <button
          className='text-white bg-gray-900 py-3 mt-3 flex items-center gap-3 justify-center hover:bg-gray-950 cursor-pointer px-5 w-full rounded-2xl'
          >
            <span><ion-icon name="create-outline"></ion-icon></span>
            <span>Edit Profile</span>
          </button>
        </div>

      </div>
    </div>
  )
}

export default ProfileCard
