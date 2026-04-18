import React, { useEffect, useState } from 'react'
import api from "../api/api"
function CreateAppointments() {
  const [employee, setEmployee] = useState("")
  const [date, setDate] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [employees, setEmployees] = useState([])

  useEffect( ()=>{
    const fetchEmployee=async()=>{
      try{
        const res=await api.get('/api/users/visitor/employees')
        const fetchEmployees=res.data.employees || []
        setEmployees(fetchEmployees)
      }catch(err){
        setError(err.response.data.message)
      }
    }
    fetchEmployee()
  },[])
  const user=JSON.parse(localStorage.getItem("user"))
  const handleCreate =async () => {
    try{
      setLoading(true)
      setError("")
      setSuccess("")
      const res=await api.post('/api/users/visitor/createAppointment',{
        date,
        message,
        visitorId:user._id,
        employeeId:employee
      })
      setSuccess("Appointment created successfully")
      setEmployee("")
      setDate("")
      setMessage("")
    }catch(err){
      setError(err.response.data.message||"Failed to create appointment")
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className='bg-[#F7FAFF] min-h-screen py-10' >
      <div className='w-3/5 mx-auto flex flex-col gap-10'>

        <div>
          <p className='uppercase tracking-widest  text-cyan-500'>Scheduled</p>
        </div>

        <div className='bg-[#FBFDFF] p-10 flex flex-col gap-10 rounded-2xl shadow-md border border-gray-300'>

          <div>
            <p className='text-gray-900 tracking-widest '>Appointment</p>
            <h1 className='text-gray-800 text-3xl  font-bold'> Create Appointments</h1>
            <p className='text-gray-400 text-lg '>Smart Scheduling for Smooth Visits </p>
          </div>

          <div className=''>
            <form
              className='flex flex-col gap-3'
              action="post">
              <div className='flex gap-10 items-center justify-between'>
                <div className='flex flex-col w-full'>
                  <label
                    className='text-gray-500 text-lg font-semibold'
                    htmlFor="employee">Select Employee</label>
                  <select
                    value={employee}
                    onChange={(e) => {
                      setEmployee(e.target.value)
                      setError("")
                    }}
                    className='bg-white py-2 px-4 text-gray-800 outline-none  text-lg rounded-2xl'
                    name="employee" id="employee">
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp._id} value={emp._id}>{emp.name}-{emp.email}</option>
                    ))}
                  </select>
                </div>
                <div className='flex flex-col w-full'>
                  <label
                    className='text-gray-500 text-lg font-semibold'
                    htmlFor="date">Select Date</label>
                  <input
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value)
                      setError("")
                    }}
                    className='bg-white py-2 px-4 text-gray-800 outline-none  text-lg rounded-2xl'
                    type="datetime-local" name="date" id="date" />
                </div>
              </div>
              <div>
                <label
                  className='text-gray-500 text-lg font-semibold'
                  htmlFor="message">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value)
                    setError("")
                  }}
                  className='bg-white py-2 px-4 w-full max-h-40  min-h-30 text-gray-800 outline-none  text-lg rounded-2xl'
                  placeholder='Enter your Purpose To Visit...'
                  name="message" id="message"></textarea>
              </div>
              <button
                type='button'
                onClick={handleCreate}
                disabled={loading}
                className='text-white bg-gray-800 py-3 rounded-2xl cursor-pointer w-fit px-15 hover:bg-gray-700 font-semibold tracking-wide mt-5 disabled:cursor-not-allowed disabled:opacity-70'
              >{loading ? "Creating..." : "Create Appointment"}</button>
            </form>
          </div>
        </div>
        {error && <p className='bg-rose-50 text-rose-700 border border-rose-600 text-center text-lg py-4 rounded-2xl mt-5'>{error}</p>}
        {success && <p className='bg-emerald-100 text-emerald-700 border border-emerald-600 text-center text-lg py-4  rounded-2xl mt-5'>{success}</p>}
      </div>
    </div>
  )
}

export default CreateAppointments
