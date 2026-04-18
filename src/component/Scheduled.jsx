import React, { useEffect, useState } from 'react'
import api from '../api/api'
function Scheduled() {
    const [schedules, setSchedules] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                setError("")
                setLoading(true)
                const res = await api.get('/api/users/employee/schedule')
                const fetchSheduled = res.data.scheduleds || []
                setSchedules(fetchSheduled)
            } catch (err) {
                setError(err.response.data.message)
            } finally {
                setLoading(false)
            }
        }
        fetchSchedule()
    }, [])
    const formatedMonth = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short"
        })
    }
    const formatedDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            day:"numeric"
        })
    }

    return (
        <div className='min-h-screen bg-[#F7FAFF] w-full py-10'>
            <div className='w-3/5 mx-auto flex flex-col gap-10'>
                <div className=''>
                    <h1 className='text-3xl capitalize  text-cyan-600 tracking-widest'>My Schedule</h1>
                    <p className='text-gray-500'>View your upcoming approved appointments</p>
                </div>
                {/* card of the schedule  */}
                {schedules.map((schedule) => (
                    <div key={schedule._id} className='bg-white transistion-all duration-150 rounded-2xl shadow-md hover:shadow-xl relative px-8 py-5 border border-gray-300'>
                        <div className='flex justify-between gap-2'>
                            <div className='flex flex-col gap-2'>
                                {/* name date time */}
                                <p
                                    className='flex gap-2 items-center '
                                >
                                    <ion-icon
                                        className="text-cyan-500  font-semibold"
                                        name="person" ></ion-icon>
                                    <span
                                        className='text-gray-700  text-lg'
                                    >{schedule.visitorId.name}</span>
                                </p>
                                <p
                                    className='flex gap-2 items-center '
                                >
                                    <ion-icon
                                        className="text-cyan-500  font-semibold"
                                        name="calendar-number"></ion-icon>
                                    <span
                                        className='text-gray-700  text-lg'
                                    >{schedule.validFrom ? new Date(schedule.validFrom).toDateString() : "No Date Found"}</span>
                                </p>
                                <p
                                    className='flex gap-2 items-center '
                                >
                                    <ion-icon
                                        className="text-cyan-500  font-semibold"
                                        name="time"></ion-icon>
                                    <span
                                        className='text-gray-700  text-lg'
                                    >{schedule.validFrom ? new Date(schedule.validFrom).toLocaleTimeString() : "No Time Found"}(1 hour)</span>
                                </p>
                            </div>
                            <div className='bg-gray-900 py-2 px-5 h-fit rounded-2xl flex flex-col items-center'>
                                {/* date */}
                                <p className=''>
                                    {formatedMonth(schedule.validFrom)}
                                </p>
                                <p className=''>
                                    {formatedDate(schedule.validFrom)}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p
                                className='bg-slate-100 text-gray-700 text-lg py-1 px-5 capatalize rounded-md mt-2 '
                            >{schedule.appointmentId.message ? schedule.appointmentId.message : "No Message Found"}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Scheduled
