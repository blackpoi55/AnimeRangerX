"use client"
import { useState } from "react" 
import getRankColor from "@/utils/getRankColor"
import StatTable from "@/components/StatTable"
import SlotCounter from "react-slot-counter"
import { statRankTable } from "@/components/JSON"

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
    const slotroll = {
        dummyCharacterCount: 8,
        duration: 0.5,
    }

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
        // ป้องกัน reroll ซ้ำระหว่างรอ
        if (rolling[type]) return

        // เริ่ม rolling
        setRolling((prev) => ({ ...prev, [type]: true }))

        // ดีเลย์กลิ้ง 800ms
        setTimeout(() => {
            const newRank = getRandomRank()
            setStats((prev) => ({ ...prev, [type]: newRank }))
            setRerollCount((prev) => ({ ...prev, [type]: (prev[type] || 0) + 1 }))
            setTotalRerollCount((prev) => prev + 1)
            setRolling((prev) => ({ ...prev, [type]: false }))
        }, 500)
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
        // ไม่เพิ่ม totalRerollCount
    }

    const resetAll = () => {
        setStats({})
        setRerollCount({})
        setRerollAllCount(0)
        setTotalRerollCount(0)
    }

    const getStatValue = (type) => {
        const rank = stats[type]
        if (!rank) return "-"
        const value = rank[type]
        return (value > 0 ? "+" : "") + value + "%"
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0f1a] to-[#141b2d] p-6 text-white flex flex-col gap-12 items-center">
            <div className="w-full max-w-6xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-8">
                <h1 className="text-4xl font-bold text-center text-blue-400 mb-6 drop-shadow-md tracking-wide">🎯 Potential Stats</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* ซ้าย - ช่องยูนิต */}
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-28 h-28 border-4 border-dashed border-gray-500 rounded-xl bg-gray-800 flex items-center justify-center text-4xl hover:border-blue-500 cursor-pointer transition">
                            +
                        </div>
                        <div className="text-yellow-400 font-bold text-lg">Worthiness : 0%</div>
                        <p className="text-sm text-gray-400 text-center leading-snug">
                            <span className="text-green-400 font-bold">Stat Potential</span> affects your unit's performance through all attributes below.
                        </p>
                    </div>

                    {/* ขวา - Stat Reroll */}
                    <div className="md:col-span-2 space-y-3">
                        {statTypes.map((stat) => {
                            const rankObj = stats[stat.key]
                            const value = rankObj ? `${rankObj[stat.key] > 0 ? "+" : ""}${rankObj[stat.key]}%` : "-"
                            const rank = rankObj?.rank || "-"
                            const rankColor = getRankColor(rank)
                            const isRolling = rolling[stat.key]

                            return (
                                <div key={stat.key} className="flex items-center justify-between bg-black/50 rounded-xl px-4 py-3 shadow-sm transition-all duration-300">
                                    {/* Icon + Value */}
                                    {/* <div className="flex items-center gap-4">
                                        <span className={`${stat.color} text-2xl`}>{stat.icon}</span>
                                        <span className={`text-lg font-bold ${rankColor}`}>
                                            {rankObj ? (
                                                <SlotCounter
                                                    value={value}
                                                    autoAnimationStart
                                                    charClassName={`text-lg font-bold ${rankColor}`}
                                                    dummyCharacterCount={slotroll.dummyCharacterCount}
                                                    duration={slotroll.duration}
                                                />
                                            ) : (
                                                "-"
                                            )}
                                        </span>
                                    </div> */}
                                    <div className="flex items-center gap-4">
                                        <span className={`${stat.color} text-2xl`}>{stat.icon}</span>
                                        <span
                                            key={value}
                                            className={`text-lg font-bold ${rankColor} animate-stat-spin`}
                                        >
                                            {value}
                                        </span>
                                    </div>

                                    {/* Rank + Reroll button */}
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${rankColor} bg-white/10 border border-white/20`}>
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${rankColor} bg-white/10 border border-white/20`}
                                            >
                                                {/* {rankObj ? (
                                                    <SlotCounter
                                                        value={rank}
                                                        autoAnimationStart
                                                        charClassName={`font-bold ${rankColor}`}
                                                        dummyCharacterCount={slotroll.dummyCharacterCount}
                                                        duration={slotroll.duration}
                                                    />
                                                ) : (
                                                    "-"
                                                )} */}
                                                <div className="w-14 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 overflow-hidden relative">
                                                    <div
                                                        key={rank}
                                                        className={`text-lg font-bold ${rankColor} animate-rank-spin`}
                                                    >
                                                        {rank}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <button
                                            onClick={() => reroll(stat.key)}
                                            disabled={isRolling}
                                            className={`px-4 py-1.5 rounded-lg font-semibold shadow-md transition
              ${isRolling
                                                    ? "bg-gray-600 cursor-not-allowed text-gray-300"
                                                    : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                                        >
                                            {isRolling ? "Rerolling..." : "Reroll"}
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>

                {/* ปุ่ม Reroll All + Reset */}
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
                </div>
            </div>

            <div className="w-full max-w-6xl">
                <StatTable statRankTable={statRankTable} />
            </div>
        </div>
    )
}
