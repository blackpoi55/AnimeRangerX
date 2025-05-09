"use client"
import { traitList } from "@/components/JSON"
import TraitStatsTable from "@/components/TraitStatsTable"
import { useState } from "react"

export default function RerollPage() {
  const [mainTrait, setMainTrait] = useState(null)
  const [subTrait, setSubTrait] = useState(null)
  const [isRolling, setIsRolling] = useState(false)
  const [rollCount, setRollCount] = useState(0)

  const getRandomTrait = () => {
    const totalChance = traitList.reduce((sum, trait) => sum + trait.chance, 0)
    const r = Math.random() * totalChance
    let acc = 0
    for (const trait of traitList) {
      acc += trait.chance
      if (r <= acc) return trait
    }
    return traitList[0]
  }

  const handleReroll = () => {
    if (isRolling) return
    setIsRolling(true)

    setTimeout(() => {
      const main = getRandomTrait()
      setMainTrait(main)

      // 5% chance to get subTrait
      const chance = Math.random()
      if (chance <= 0.05) {
        const sub = getRandomTrait()
        setSubTrait(sub)
      } else {
        setSubTrait(null)
      }

      setRollCount((prev) => prev + 1)
      setIsRolling(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-black p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-white shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-purple-300 mb-6">✨ Trait Reroll</h1>

        <div className="grid grid-cols-3 gap-6 items-center">
          {/* Avatar */}
          <div className="col-span-1 flex flex-col items-center">
            <div className="w-28 h-28 rounded bg-gray-800 border-2 border-gray-500 flex items-center justify-center text-5xl text-white">
              +
            </div>
            <div className="mt-2 text-sm text-gray-300">None</div>
            <div className="flex gap-2 mt-4">
              <div className="bg-purple-800 px-3 py-1 rounded-lg text-sm font-bold">🔮 x0</div>
              <div className="bg-red-600 px-3 py-1 rounded-lg text-sm font-bold">🎯 x0</div>
            </div>
            <button className="mt-3 bg-cyan-500 hover:bg-cyan-600 transition px-4 py-1 rounded text-white text-sm font-semibold shadow">
              Odds
            </button>
          </div>

          {/* Trait Boxes */}
          <div className="col-span-2 space-y-4">
            {[mainTrait, subTrait].map((trait, idx) => (
              <div key={idx} className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 min-h-[40px]">
                {isRolling ? (
                  <span className="animate-pulse text-purple-400">⏳ {idx === 0 ? "กำลังสุ่ม..." : ""}</span>
                ) : trait ? (
                  <span
                    key={trait.name}
                    className={`animate-trait-roll font-bold ${  trait.rarity === 'rare' ? 'text-blue-400' :
                      trait.rarity === 'epic' ? 'text-purple-400' :
                      trait.rarity === 'legendary' ? 'text-yellow-400' :
                      'text-red-400'
                      }`}
                  >
                    {trait.name} — <span className="text-sm text-white/70">{trait.desc}</span>
                  </span>
                ) : (
                  <span className="text-gray-400">🔒 Locked</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            onClick={handleReroll}
            disabled={isRolling}
            className={`px-8 py-2 rounded-xl font-bold shadow-md transition
      ${isRolling
                ? "bg-gray-600 cursor-not-allowed text-gray-300"
                : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
          >
            {isRolling ? "Rolling..." : "🔁 Reroll"}
          </button>

          <p className="text-sm text-gray-400 mt-2">รวมสุ่มทั้งหมด: {rollCount} ครั้ง</p>

          {/* ปุ่ม Reset Count */}
          <button
            onClick={() => setRollCount(0)}
            className="mt-2 px-4 py-1 rounded-md bg-red-600 hover:bg-red-700 transition text-sm font-semibold text-white shadow"
          >
            ♻️ Reset Count
          </button>
        </div>
      </div>
      <TraitStatsTable
        rollCount={rollCount}
        mainTrait={mainTrait}
        subTrait={subTrait}
      />
    </div>
  )
}
