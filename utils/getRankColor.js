// utils/getRankColor.js

const getRankColor = (rank) => {
    if (rank.startsWith("C")) return "text-red-500"
    if (rank.startsWith("B")) return "text-yellow-400"
    if (rank.startsWith("A")) return "text-green-400"
    if (rank.startsWith("S") && rank !== "SS" && rank !== "SSS") return "text-cyan-400"
    if (rank === "SS" || rank === "SSS") return "text-blue-400"
    if (rank.startsWith("O")) return "text-pink-400"
    return "text-white"
  }
  
  export default getRankColor
  