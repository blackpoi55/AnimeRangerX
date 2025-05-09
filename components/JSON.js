export const statRankTable = [
    { rank: "C-", damage: -10, health: -10, speed: -10, range: -10, cooldown: 10, chance: 100 },
    { rank: "C", damage: -6.5, health: -5, speed: -5, range: -5, cooldown: 5, chance: 90 },
    { rank: "C+", damage: -3, health: -2, speed: -2, range: -2, cooldown: 2, chance: 80 },
    { rank: "B-", damage: 2, health: 1, speed: 1, range: 1, cooldown: -1, chance: 70 },
    { rank: "B", damage: 3, health: 1.5, speed: 1.5, range: 1.5, cooldown: -1.5, chance: 60 },
    { rank: "B+", damage: 6.5, health: 3.5, speed: 3.5, range: 3.5, cooldown: -3.5, chance: 50 },
    { rank: "A-", damage: 10, health: 5, speed: 5, range: 5, cooldown: -5, chance: 40 },
    { rank: "A", damage: 12.5, health: 6.5, speed: 6.5, range: 6.5, cooldown: -6.5, chance: 35 },
    { rank: "A+", damage: 14.8, health: 7.3, speed: 7.3, range: 7.3, cooldown: -7.3, chance: 30 },
    { rank: "S-", damage: 17, health: 8.5, speed: 8.5, range: 8.5, cooldown: -8.5, chance: 25 },
    { rank: "S", damage: 17.8, health: 8.9, speed: 8.9, range: 8.9, cooldown: -8.9, chance: 20 },
    { rank: "S+", damage: 18, health: 9, speed: 9, range: 9, cooldown: -9, chance: 15 },
    { rank: "SS", damage: 19, health: 9.3, speed: 9.3, range: 9.3, cooldown: -9.3, chance: 10 },
    { rank: "SSS", damage: 20, health: 10, speed: 10, range: 10, cooldown: -10, chance: 5 },
    { rank: "O-", damage: 20, health: 20, speed: 20, range: 20, cooldown: -20, chance: 0.35 },
    { rank: "O", damage: 25, health: 25, speed: 25, range: 25, cooldown: -25, chance: 0.5 },
    { rank: "O+", damage: 30, health: 30, speed: 30, range: 30, cooldown: -30, chance: 0.25 }
]

export const traitList = [
    // 🔵 ฟ้า 
    { name: "Endure I", desc: "This unit has increased HP!", chance: 8, color: "blue", svg: "/svg/Endure", rarity: "rare" },
    { name: "Horizon I", desc: "This unit has increased range!", chance: 8, color: "blue", svg: "/svg/Horizon", rarity: "rare" },
    { name: "Superior I", desc: "This unit has increased damage!", chance: 8, color: "blue", svg: "/svg/Superior", rarity: "rare" },
    { name: "Superior II", desc: "This unit has increased damage!", chance: 7, color: "blue", svg: "/svg/Superior", rarity: "rare" },
    { name: "Horizon II", desc: "This unit has increased range!", chance: 7, color: "blue", svg: "/svg/Horizon", rarity: "rare" },
    { name: "Endure II", desc: "This unit has increased HP!", chance: 7, color: "blue", svg: "/svg/Endure", rarity: "rare" },
    { name: "Horizon III", desc: "This unit has increased range!", chance: 6, color: "blue", svg: "/svg/Horizon", rarity: "rare" },
    { name: "Superior III", desc: "This unit has increased damage!", chance: 6, color: "blue", svg: "/svg/Superior", rarity: "rare" },
    { name: "Endure III", desc: "This unit has increased HP!", chance: 6, color: "blue", svg: "/svg/Endure", rarity: "rare" },

    // 🟣 ม่วง
    { name: "Brute", desc: "This unit specializes in damage!", chance: 5, color: "purple", svg: "/svg/Brute", rarity: "epic" },
    { name: "Sniper", desc: "This unit specializes in range!", chance: 5, color: "purple", svg: "/svg/Sniper", rarity: "epic" },
    { name: "Colossal", desc: "This unit specializes in HP!", chance: 5, color: "purple", svg: "/svg/Colossal", rarity: "epic" },
    { name: "Investor", desc: "This unit has reduced cost!", chance: 5, color: "purple", svg: "/svg/Investor", rarity: "epic" },
    { name: "Jokester", desc: "A balanced unit!", chance: 5, color: "purple", svg: "/svg/Jokester", rarity: "epic" },

    // 🟡 ทอง
    { name: "Blitz", desc: "Extreme range boost!", chance: 3.5, color: "yellow", svg: "/svg/Blitz", rarity: "legendary" },
    { name: "Juggernaut", desc: "Extreme HP boost!", chance: 2.5, color: "yellow", svg: "/svg/Juggernaut", rarity: "legendary" },
    { name: "Millionaire", desc: "Significant cost reduction!", chance: 2.5, color: "yellow", svg: "/svg/Millionaire", rarity: "legendary" },
    { name: "Violent", desc: "Extreme damage boost!", chance: 2.5, color: "yellow", svg: "/svg/Violent", rarity: "legendary" },

    // 🔴 แดง
    { name: "Scraph", desc: "Unparalleled power!", chance: 0.5, color: "cyan", svg: "/svg/Scraph", rarity: "mystic" },
    { name: "Capitalist", desc: "Massive cost reduction and strength", chance: 0.25, color: "red", svg: "/svg/Capitalist", rarity: "mystic" },
    { name: "Duplicator", desc: "This unit duplicates on spawn!", chance: 0.15, color: "red", svg: "/svg/Duplicator", rarity: "mystic" },
    { name: "Sovereign", desc: "Ultimate power!", chance: 0.1, color: "red", svg: "/svg/Sovereign", rarity: "mystic" },
];
export const afkdropPool = [
    { name: "Ace", chance: 0.5 },
]

export const avatar = [
    { name: "Ace", image: "/avatar/ace.png" },
]