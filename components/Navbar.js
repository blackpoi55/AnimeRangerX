"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { decryptAFK } from "@/utils/encryptAFK"

const navItems = [
  { name: "AFK", path: "/afk" },
  { name: "สุ่มสเตตัส", path: "/stat" },
  { name: "สุ่ม Reroll", path: "/reroll" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [status, setStatus] = useState("Loading...")
  const [statusColor, setStatusColor] = useState("text-gray-300")

  useEffect(() => {
    try {
      const saved = localStorage.getItem("afk_data")
      if (saved) {
        const decoded = decryptAFK(saved)
        if (decoded.vip) {
          setStatus("VIP")
          setStatusColor("text-yellow-400")
        } else if (decoded.premium) {
          setStatus("Premium")
          setStatusColor("text-purple-400")
        } else {
          setStatus("General")
          setStatusColor("text-gray-400")
        }
      } else {
        setStatus("General")
        setStatusColor("text-gray-400")
      }
    } catch {
      setStatus("General")
      setStatusColor("text-gray-400")
    }
  }, [])

  // useEffect(() => {
  //   const detectDevTools = () => {
  //     const threshold = 160
  //     const check = setInterval(() => {
  //       const widthThreshold = window.outerWidth - window.innerWidth > threshold
  //       const heightThreshold = window.outerHeight - window.innerHeight > threshold
  //       if (widthThreshold || heightThreshold) {
  //         clearInterval(check)
  //         location.reload()
  //       }
  //     }, 1000)
  //     return () => clearInterval(check)
  //   }
  //   detectDevTools()
  // }, [])

  return (
    <nav className="bg-gray-900 p-4 flex gap-4 shadow-lg">
      <div className="text-2xl font-bold text-white w-4/6 flex items-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`px-4 py-2 rounded hover:bg-gray-700 transition ${
              pathname === item.path ? "bg-blue-600 text-white" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="text-2xl font-bold text-white w-1/6 flex justify-center">
        <img className="h-12" src="/images/ARX_.png" alt="" />
      </div>
      <div className="font-bold text-white w-4/6 flex items-center justify-end gap-4">
        <span className={`text-sm font-semibold ${statusColor}`}>Status: {status}</span>
        <label className="text-pink-500">Cr: BoatMousay</label>
      </div>
    </nav>
  )
}
