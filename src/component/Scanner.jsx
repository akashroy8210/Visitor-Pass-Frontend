import React, { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from "html5-qrcode"
import api from '../api/api';
function Scanner() {
    const scannerRef = useRef(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scannedData, setScannedData] = useState("");
    const [error, setError] = useState("")
    const startScan = async () => {
        const scanner = new Html5Qrcode("reader");
        scannerRef.current = scanner;
        try {
            setIsScanning(true)
            setScannedData("");
            setError("")
            await scanner.start(
                { facingMode: "user" },
                {
                    fps: 5,
                    qrbox: 250
                },
                async (decodetext) => {
                    const passId = JSON.parse(decodetext).passId
                    try {
                        const res = await api.post('/api/users/security/scanQr', { id: passId })
                        console.log("scanned", res.data.existingLog);
                        console.log("scanned", res.data.pass);
                        const data = res.data
                        setScannedData(data);
                    } catch (err) {
                        setError(err.response?.data?.message || "Unable to scan QR code")
                    }
                    console.log(passId)
                    await scanner.stop();
                    await scanner.clear();
                    setIsScanning(false);
                },
            )
        } catch (err) {
            setError(err.response?.data?.message || "Unable to scan QR code")
            console.log(err)
        } finally {
            setIsScanning(false)
        }
    }

    return (
        <div className='min-h-screen bg-[#F7FAFF] w-full py-10'>
            <div className='w-3/5 mx-auto flex flex-col gap-10'>
                <div>
                    <h1 className='text-3xl capitalize  text-cyan-600 tracking-widest'>QR Scanner</h1>
                    <p className='text-gray-500 text-lg' >Scan visitor passes for check-in and check-out</p>
                </div>
                <div className='bg-white transistion-all duration-150 flex items-center gap-10 justify-center flex-col rounded-2xl shadow-md hover:shadow-xl relative px-8 py-10 border border-gray-300'>
                    <div id='reader' className='h-113 w-150 overflow-hidden text-gray-500 flex flex-col items-center justify-center rounded-2xl border-4 border-dotted border-gray-300 bg-gray-50 backdrop-blur-2xl'>
                        <ion-icon
                            className="text-8xl"
                            name="scan-outline" ></ion-icon>
                        <p className='text-gray-500'>Position QR code here</p>
                    </div>
                    <button
                        onClick={() => startScan()}
                        className='bg-gray-900 transition-all duration-150 text-white px-15  py-3 rounded-2xl text-lg hover:bg-gray-800 cursor-pointer'
                    >{isScanning ? "scanning..." : "Start Scanning"}</button>
                </div>
                {error && <p className='bg-rose-100 text-rose-600 border rounded-2xl border-rose-600 text-center py-3'>{error}</p>}
                {scannedData && (
                    <div className='bg-white rounded-2xl shadow-xl text-gray-700 px-8 py-10 border border-gray-300 flex flex-col gap-3'>
                        <div className='flex items-center gap-4 mb-5'>
                            <span className='bg-green-500 py-3 text-white px-3 rounded-2xl'><ion-icon
                                className='text-5xl flex items-center justify-center'
                                name="checkmark-circle-outline"></ion-icon></span>
                            <div className='flex flex-col'>
                                <span className='capitalize text-gray-700 tracking-wider text-3xl'>{scannedData?.existingLog?.status} Successfully </span>
                                <p className='text-gray-500'>Visitor has been {scannedData?.existingLog?.status}</p>
                            </div>
                        </div>
                        <p className='flex items-center gap-2'>
                            <ion-icon name="person-outline"></ion-icon>
                            <span>Visitor: {scannedData?.pass?.visitorId?.name}</span>
                        </p>
                        <p className='flex items-center gap-2'>
                            <ion-icon name="person-outline"></ion-icon>
                            <span>Meeting with: {scannedData?.pass?.employeeId?.name}</span>
                        </p>
                        <p className='flex items-center gap-2'>
                            <ion-icon name="calendar-outline"></ion-icon>
                            <span>
                                Date: {new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
                            </span>
                        </p>
                        <p className='flex items-center gap-2'>
                            <ion-icon name="time-outline"></ion-icon>
                            <span>
                                Time: {new Date().toLocaleTimeString()}
                            </span>
                        </p>
                        <p className='flex items-center gap-2'>
                            <ion-icon name="scan-outline"></ion-icon>
                            <span>
                                Pass Id: {scannedData?.pass?._id}
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Scanner
