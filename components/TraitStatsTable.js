// components/TraitStatsTable.js
"use client"
import { traitList } from "@/components/JSON"

export default function TraitStatsTable({ rollCount, mainTrait, subTrait }) {
  return (
    <div className="mt-10 w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-white mb-4">📚 Trait List</h2>
      <div className="bg-white/10 backdrop-blur rounded-xl border border-white/10 overflow-auto max-h-[100vh]">
        <table className="w-full table-auto text-left text-sm text-white">
          <thead className="bg-white/10 border-b border-white/10 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2">Trait</th>
              <th className="px-4 py-2">คำอธิบาย</th>
              <th className="px-4 py-2">โอกาส (%)</th>
              <th className="px-4 py-2">ระดับ</th>
            </tr>
          </thead>
          <tbody>
            {traitList.map((trait) => {
              const isMain = trait.name === mainTrait?.name;
              const isSub = trait.name === subTrait?.name;
              const rowHighlight = isMain
                ? "bg-gradient-to-r from-blue-800/40 to-transparent"
                : isSub
                ? "bg-gradient-to-r from-green-800/40 to-transparent"
                : "";

              return (
                <tr
                  key={trait.name}
                  className={`border-b border-white/10 ${rowHighlight}`}
                >
                  <td className="px-4 py-2 font-medium">{trait.name}</td>
                  <td className="px-4 py-2 text-white/80">{trait.desc}</td>
                  <td className="px-4 py-2">{trait.chance}</td>
                  <td className={`px-4 py-2 capitalize font-semibold ${
                    trait.rarity === 'rare' ? 'text-blue-400' :
                    trait.rarity === 'epic' ? 'text-purple-400' :
                    trait.rarity === 'legendary' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {trait.rarity}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}