"use client"
import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { name: "AFK", path: "/afk" },
  { name: "สุ่มสเตตัส", path: "/stat" },
  { name: "สุ่ม Reroll", path: "/reroll" },
]

export default function Navbar() {
  const pathname = usePathname()

  useEffect(() => {
    const detectDevTools = () => {
      const threshold = 160
      const check = setInterval(() => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold
        const heightThreshold = window.outerHeight - window.innerHeight > threshold
        if (widthThreshold || heightThreshold) {
          clearInterval(check)
          location.reload()
        }
      }, 1000)
      return () => clearInterval(check)
    }

    detectDevTools()
  }, [])

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
      <div className="font-bold text-white w-4/6 flex items-center justify-end">
        <label className="text-pink-500">Cr: BoatMousay</label>
      </div>
    </nav>
  )
}
