"use client"
import { useEffect, useRef, useState } from "react"
import { afkdropPool, avatar } from "@/components/JSON"
import { encryptAFK, decryptAFK } from "@/utils/encryptAFK"

export default function AFK() {
  const payoutInterval = 600
  const counter = useRef(0)

  const [time, setTime] = useState(0)
  const [afkData, setAfkData] = useState({ currency: 0, vip: false, premium: false, history: [] })
  const [showHistory, setShowHistory] = useState(false)
  const [filterName, setFilterName] = useState("All")
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("afk_data")
      if (saved) {
        setAfkData(decryptAFK(saved))
      }
      setHasMounted(true)
    }
  }, [])

  const gainPerPayout = afkData.vip ? 75 : afkData.premium ? 50 : 25

  useEffect(() => {
    if (!hasMounted) return
    localStorage.setItem("afk_data", encryptAFK(afkData))
  }, [afkData, hasMounted])

  useEffect(() => {
    if (!hasMounted) return
    const interval = setInterval(() => {
      counter.current += 1
      setTime(counter.current)

      if (counter.current % payoutInterval === 0) {
        const newCurrency = afkData.currency + gainPerPayout
        let newHistory = [...afkData.history]

        for (const drop of afkdropPool) {
          if (Math.random() * 100 <= drop.chance) {
            newHistory.push({ name: drop.name, time: new Date().toISOString() })
          }
        }

        setAfkData({ ...afkData, currency: newCurrency, history: newHistory })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [afkData, hasMounted])

  const formatNumber = (num) => num.toLocaleString("en-US")
  const nextPayout = payoutInterval - (time % payoutInterval)

  const dropCounts = afkData.history.reduce((acc, item) => {
    const avatarInfo = avatar.find((a) => a.name === item.name)
    const image = avatarInfo?.image?.trim() ? avatarInfo.image : "/avatar/noimg.png"
    acc[item.name] = acc[item.name] || { count: 0, image }
    acc[item.name].count += 1
    return acc
  }, {})

  const filteredHistory = filterName === "All"
    ? afkData.history
    : afkData.history.filter(h => h.name === filterName)

  const handleCodeSubmit = () => {
    const input = prompt("Enter your code:")?.trim().toLowerCase()
    if (!input) return

    if (input === "vippuccy") {
      alert("✅ VIP activated!")
      setAfkData((prev) => ({ ...prev, vip: true }))
    } else if (input === "1212312121") {
      alert("✅ Premium activated!")
      setAfkData((prev) => ({ ...prev, premium: true }))
    } else {
      alert("❌ Invalid code")
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4 text-white">
      <h1 className="text-5xl font-extrabold text-yellow-400 drop-shadow mb-4">AFK CHAMBER</h1>

      {/* Drops */}
      <div className="bg-white/10 border border-white/20 rounded-lg px-6 py-3 mb-6 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-1 text-green-300">🎯 Potential Drops</h2>
        <ul className="text-sm text-white space-y-2">
          {afkdropPool.map((drop) => {
            const matchedAvatar = avatar.find((a) => a.name === drop.name)
            const image = matchedAvatar?.image?.trim() ? matchedAvatar.image : "/avatar/noimg.png"
            return (
              <li key={drop.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={image} alt={drop.name} className="w-6 h-6 rounded-full" />
                  <span className="text-white font-medium">{drop.name}</span>
                </div>
                <span className="text-green-400">{drop.chance}%</span>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Summary */}
      <div className="bg-white/10 border border-white/20 rounded-lg px-6 py-3 mb-4 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-1 text-purple-300">🎁 Drops Summary</h2>
        {Object.keys(dropCounts).length === 0 ? (
          <p className="text-sm text-white/60 italic">No drops yet.</p>
        ) : (
          <ul className="text-sm text-white space-y-2">
            {Object.entries(dropCounts).map(([name, data]) => (
              <li key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={data.image || "/avatar/noimg.png"} alt={name} className="w-6 h-6 rounded-full" />
                  <span className="text-red-400 font-bold">{name}</span>
                </div>
                <span className="text-white">x{data.count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Stats */}
      {hasMounted && (
        <>
          <p className="text-lg mb-2">
            <span className="text-gray-300">Next Payout: </span>
            <span className="text-green-400 font-bold">{nextPayout}s</span>
          </p>

          <div className="bg-black border-2 border-purple-600 rounded-2xl py-6 px-10 max-w-sm w-full shadow-xl mb-4">
            <p className="text-green-400 text-lg font-semibold mb-2">Currency Gained: {gainPerPayout}x</p>
            <p className="text-white text-base mb-1">Total Gems:</p>
            <p className="text-4xl font-bold text-purple-400">
              {formatNumber(afkData.currency)}x <span className="text-cyan-300">💎</span>
            </p>
            <p className="text-sm text-white/70 mt-1">
              You will get: <span className="text-green-400 font-semibold">{gainPerPayout}x</span>
            </p>
          </div>
        </>
      )}

      <p className="text-purple-400 font-bold">VIP Players get 75x currencies!</p>
      <p className="text-yellow-300 font-bold mb-4">Premium Players get 50x currencies!</p>

      <button
        onClick={handleCodeSubmit}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-xl shadow mt-2"
      >
        🏷️ Enter Code
      </button>

      <button
        onClick={() => setShowHistory(!showHistory)}
        className="bg-blue-500 hover:bg-blue-600 px-5 py-2 mt-2 rounded-lg font-semibold text-white shadow"
      >
        📜 View Drop History
      </button>

      {showHistory && (
        <div className="mt-6 max-w-md w-full bg-white/10 rounded-lg p-4 border border-white/20 text-left">
          <h2 className="text-lg font-bold text-white mb-4">Drop History</h2>
          <div className="mb-4">
            <label className="text-white mr-2">Filter:</label>
            <select
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="text-red-500 rounded border border-white px-2 py-1"
            >
              <option value="All">All</option>
              {avatar.map((a) => (
                <option key={a.name} value={a.name}>{a.name}</option>
              ))}
            </select>
          </div>
          {filteredHistory.length === 0 ? (
            <p className="text-white/60 italic">No drops yet.</p>
          ) : (
            <ul className="max-h-60 overflow-auto space-y-1 text-sm">
              {filteredHistory.slice().reverse().map((h, i) => {
                const avatarInfo = avatar.find((a) => a.name === h.name)
                const image = avatarInfo?.image?.trim() ? avatarInfo.image : "/avatar/noimg.png"
                return (
                  <li key={i} className="text-white/90 flex items-center gap-2">
                    <img src={image} alt={h.name} className="w-5 h-5 rounded-full" />
                    <span className="font-semibold text-red-400">{h.name}</span> — <span className="text-white/70">{new Date(h.time).toLocaleString()}</span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
