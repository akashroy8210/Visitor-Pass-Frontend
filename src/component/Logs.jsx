import React, { useEffect, useState } from 'react'
import api from '../api/api'
function Logs() {
    const [logs, setLogs] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const role=JSON.parse(localStorage.getItem("user")).role
    const endpoints=()=>{
        if(role==="Admin"){
            return '/api/users/admin/logs'
        }else if(role==="Security"){
            return '/api/users/security/logs'
        }else if(role==="Visitor"){
            return '/api/users/visitor/logs'
        }
    }
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                setError("")
                setLoading(true)
                const endpoint=endpoints()
                console.log(endpoint)
                const res = await api.get(endpoint)
                const fetchedLogs = res.data.logs
                setLogs(fetchedLogs)
            } catch (err) {
                setError(err.response?.data?.message || "Unable to fetch logs.")
            } finally {
                setLoading(false)
            }
        }
        fetchLogs()
    }, [])
    const statusColor = (status) => {
        if(status=="checked-out"){
            return "bg-green-500"
        }else{
            return "bg-gray-300"
        }
    }
    return (
        <div className='min-h-screen py-10 bg-[#F7FAFF]'>
            <div className='w-2/3 flex  mx-auto flex-col gap-10'>
                <div>
                    <h3 className='text-gray-700 text-4xl font-bold'>Entry Logs</h3>
                    <p className='text-gray-500 text-lg tracking-wider'>Monitor all visitor check-ins and check-outs</p>
                </div>
                <div>
                    {/* //last date of logs */}
                    <p className='mb-5'>
                        <span className='text-gray-700 text-lg font-semibold'>Last 7 days Logs</span>
                    </p>
                    {logs.length > 0 ? (
                        <div>
                            {logs.map((log) => (
                                <div
                                key={log._id}
                                className='bg-white  transistion-all duration-150 flex  gap-3  flex-col rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 relative px-8 py-5 border border-gray-300'>
                                    <p
                                    className='flex gap-4 px-2 items-center'
                                    >
                                        <span className={`h-3 w-3 rounded-full  ${statusColor(log.status)} `}></span>
                                        <span className='text-gray-700 font-semibold text-xl'>{log?.visitorId?.name  || ""}</span>
                                    </p>
                                    <p className='flex gap-4 items-center text-gray-600'>
                                        <ion-icon className="text-green-600 text-xl" name="log-in-outline" ></ion-icon>
                                        <span>
                                            <span className='font-semibold'>Check-in:</span> {new Date(log?.checkInTime).toLocaleString("en-US" ,{
                                                day:"numeric",
                                                month:"short",
                                                year:"numeric",
                                                hour:"numeric",
                                                minute:"numeric",
                                            }) || ""}
                                        </span>
                                    </p>
                                    <p className='flex gap-3 px-1 items-center text-gray-600'>
                                        {log.status==="checked-in"? <ion-icon className="text-orange-700 text-xl" name="time-outline" ></ion-icon>:<ion-icon className="text-blue-600 text-xl" name="log-out-outline" ></ion-icon>}
                                        <span>
                                            <span className='font-semibold'>Check-out:</span> {log.checkOutTime?  new Date(log?.checkOutTime).toLocaleString("en-US",{
                                                day:"numeric",
                                                month:"short",
                                                year:"numeric",
                                                hour:"numeric",
                                                minute:"numeric",
                                            }) : "Not Checked Out"}
                                        </span>
                                    </p>
                                    <p className='absolute top-4 right-4'>{log.status==="checked-in" ?
                                     <span className='bg-emerald-100 text-emerald-600 border border-emerald-600 py-1 px-4 rounded-2xl '>In Progress</span>
                                     :<span className='bg-gray-200 text-gray-800 font-semibold tracking-wide py-1 rounded-2xl px-4 border border-gray-400'>Completed</span>}
                                     </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <p className='text-rose-600 bg-rose-100 border border-rose-600 py-2 rounded-2xl text-center text-lg'>{error}</p>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default Logs
