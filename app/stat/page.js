"use client"
import { useState, useEffect } from "react"
import getRankColor from "@/utils/getRankColor"
import StatTable from "@/components/StatTable"
import { statRankTable } from "@/components/JSON"
import { decryptAFK } from "@/utils/encryptAFK"

const statTypes = [
  { key: "damage", label: "Damage", icon: "🔥", color: "text-red-400" },
  { key: "health", label: "Health", icon: "💚", color: "text-green-400" },
  { key: "speed", label: "Speed", icon: "💨", color: "text-cyan-400" },
  { key: "range", label: "Range", icon: "📏", color: "text-orange-400" },
  { key: "cooldown", label: "Cooldown", icon: "⏱", color: "text-gray-400" },
]

export default function StatPage() {
  const [stats, setStats] = useState({})
  const [rerollCount, setRerollCount] = useState({})
  const [rerollAllCount, setRerollAllCount] = useState(0)
  const [totalRerollCount, setTotalRerollCount] = useState(0)
  const [rolling, setRolling] = useState({})
  const [autoRerollTarget, setAutoRerollTarget] = useState("SSS")
  const [targetStatKey, setTargetStatKey] = useState("damage")
  const [isAutoRerolling, setIsAutoRerolling] = useState(false)
  const [vip, setVip] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("afk_data")
      if (saved) {
        const data = decryptAFK(saved)
        if (data?.vip) setVip(true)
      }
    }
  }, [])

  const getRandomRank = () => {
    const total = statRankTable.reduce((sum, s) => sum + s.chance, 0)
    const r = Math.random() * total
    let acc = 0
    for (const s of statRankTable) {
      acc += s.chance
      if (r <= acc) return s
    }
    return statRankTable[0]
  }

  const reroll = (type) => {
    if (rolling[type]) return
    setRolling((prev) => ({ ...prev, [type]: true }))

    setTimeout(() => {
      const newRank = getRandomRank()
      setStats((prev) => ({ ...prev, [type]: newRank }))
      setRerollCount((prev) => ({ ...prev, [type]: (prev[type] || 0) + 1 }))
      setTotalRerollCount((prev) => prev + 1)
      setRolling((prev) => ({ ...prev, [type]: false }))
    }, vip ? 200 : 500)
  }

  const rerollAll = () => {
    const newStats = {}
    const newRerollCount = { ...rerollCount }
    statTypes.forEach((s) => {
      newStats[s.key] = getRandomRank()
      newRerollCount[s.key] = (newRerollCount[s.key] || 0) + 1
    })
    setStats(newStats)
    setRerollCount(newRerollCount)
    setRerollAllCount((count) => count + 1)
  }

  const resetAll = () => {
    setStats({})
    setRerollCount({})
    setRerollAllCount(0)
    setTotalRerollCount(0)
  }

  const startAutoReroll = () => {
    if (!vip) return alert("ต้องเป็น VIP เท่านั้น!")
    if (isAutoRerolling) return

    setIsAutoRerolling(true)

    const loop = () => {
      const newRank = getRandomRank()
      const newStats = { ...stats, [targetStatKey]: newRank }
      setStats(newStats)
      setRerollCount((prev) => ({ ...prev, [targetStatKey]: (prev[targetStatKey] || 0) + 1 }))
      setTotalRerollCount((prev) => prev + 1)

      const targetIndex = statRankTable.findIndex((s) => s.rank === autoRerollTarget)
      const currentIndex = statRankTable.findIndex((s) => s.rank === newRank.rank)

      if (currentIndex < targetIndex) {
        setTimeout(loop, 100)
      } else {
        setIsAutoRerolling(false)
      }
    }

    loop()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1a] to-[#141b2d] p-6 text-white flex flex-col gap-12 items-center">
      <div className="w-full max-w-6xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-blue-400 mb-6 drop-shadow-md tracking-wide">🎯 Potential Stats</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center gap-6">
            <div className="w-28 h-28 border-4 border-dashed border-gray-500 rounded-xl bg-gray-800 flex items-center justify-center text-4xl hover:border-blue-500 cursor-pointer transition">+</div>
            <div className="text-yellow-400 font-bold text-lg">Worthiness : 0%</div>
            <p className="text-sm text-gray-400 text-center leading-snug">
              <span className="text-green-400 font-bold">Stat Potential</span> affects your unit's performance through all attributes below.
            </p>
          </div>

          <div className="md:col-span-2 space-y-3">
            {statTypes.map((stat) => {
              const rankObj = stats[stat.key]
              const value = rankObj ? `${rankObj[stat.key] > 0 ? "+" : ""}${rankObj[stat.key]}%` : "-"
              const rank = rankObj?.rank || "-"
              const rankColor = getRankColor(rank)
              const isRolling = rolling[stat.key]

              return (
                <div key={stat.key} className="flex items-center justify-between bg-black/50 rounded-xl px-4 py-3 shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <span className={`${stat.color} text-2xl`}>{stat.icon}</span>
                    <span key={value} className={`text-lg font-bold ${rankColor} animate-stat-spin`}>{value}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${rankColor} bg-white/10 border border-white/20`}>
                      <div className="w-14 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 overflow-hidden relative">
                        <div key={rank} className={`text-lg font-bold ${rankColor} animate-rank-spin`}>{rank}</div>
                      </div>
                    </div>
                    <button onClick={() => reroll(stat.key)} disabled={isRolling} className={`px-4 py-1.5 rounded-lg font-semibold shadow-md transition ${isRolling ? "bg-gray-600 cursor-not-allowed text-gray-300" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>{isRolling ? "Rerolling..." : "Reroll"}</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2">
          <button
            onClick={rerollAll}
            className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 px-8 py-3 text-lg font-bold text-white rounded-2xl shadow-lg transition"
          >
            🔁 Reroll All
          </button>
          <p className="text-sm text-gray-400 mt-1">
            Total Reroll All: {rerollAllCount} | Total Manual Rerolls: {totalRerollCount}
          </p>
          <button
            onClick={resetAll}
            className="mt-4 text-sm px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold text-white shadow"
          >
            ♻️ Reset All
          </button>

          {vip && (
            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="flex gap-4 items-center flex-wrap">
                <div className="flex gap-2 items-center">
                  <span>Stat:</span>
                  {statTypes.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setTargetStatKey(s.key)}
                      className={`px-3 py-1 rounded-full font-semibold text-sm ${targetStatKey === s.key ? "bg-blue-500 text-white" : "bg-white text-black"}`}
                      disabled={isAutoRerolling}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 items-center">
                  <span>Rank:</span>
                  {statRankTable.map((r) => (
                    <button
                      key={r.rank}
                      onClick={() => setAutoRerollTarget(r.rank)}
                      className={`px-3 py-1 rounded-full font-semibold text-sm ${autoRerollTarget === r.rank ? "bg-yellow-500 text-white" : "bg-white text-black"}`}
                      disabled={isAutoRerolling}
                    >
                      {r.rank}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={startAutoReroll}
                disabled={isAutoRerolling}
                className={`mt-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg ${isAutoRerolling ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                🚀 Auto Reroll
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-6xl">
        <StatTable statRankTable={statRankTable} />
      </div>
    </div>
  )
}
