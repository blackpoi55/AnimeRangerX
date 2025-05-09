import getRankColor from '@/utils/getRankColor'
import React from 'react'

function StatTable(props) {
    const { statRankTable } = props
    return (
        <div className="overflow-x-auto mt-10">
            <h2 className="text-xl font-bold mb-4">📋 ตาราง Rank Stat ทั้งหมด</h2>
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="p-2 text-pink-400">Stat</th>
                        <th className="p-2 text-red-500">🔥 Damage</th>
                        <th className="p-2 text-green-500">💚 Health</th>
                        <th className="p-2 text-cyan-400">💨 Speed</th>
                        <th className="p-2 text-orange-400">📏 Range</th>
                        <th className="p-2 text-blue-400">⏱ Cooldown</th>
                        <th className="p-2 text-yellow-400">🎲 Chance</th>
                    </tr>
                </thead>
                <tbody>
                    {statRankTable.map((rank, index) => (
                        <tr
                            key={rank.rank}
                            className={`text-center ${index % 2 === 0 ? "bg-black/20" : "bg-black/10"}`}
                        >
                            <td className={`p-2 font-bold ${getRankColor(rank.rank)}`}>{rank.rank}</td>
                            <td className="p-2 text-red-400">{rank.damage > 0 ? `+${rank.damage}%` : `${rank.damage}%`}</td>
                            <td className="p-2 text-green-400">{rank.health > 0 ? `+${rank.health}%` : `${rank.health}%`}</td>
                            <td className="p-2 text-cyan-300">{rank.speed > 0 ? `+${rank.speed}%` : `${rank.speed}%`}</td>
                            <td className="p-2 text-orange-300">{rank.range > 0 ? `+${rank.range}%` : `${rank.range}%`}</td>
                            <td className="p-2 text-blue-300">{rank.cooldown > 0 ? `+${rank.cooldown}%` : `${rank.cooldown}%`}</td>
                            <td className="p-2 text-yellow-300">{rank.chance}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default StatTable