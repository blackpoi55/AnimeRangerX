// utils/encryptAFK.js
import CryptoJS from "crypto-js"

const secretKey = "afk_super_secret"

/**
 * เข้ารหัสข้อมูล AFK
 * @param {Object} data - ข้อมูลที่ต้องการเข้ารหัส
 * @returns {string} - ข้อความเข้ารหัส
 */
export function encryptAFK(data) {
  const json = JSON.stringify(data)
  return CryptoJS.AES.encrypt(json, secretKey).toString()
}

/**
 * ถอดรหัสข้อมูล AFK
 * @param {string} ciphertext - ข้อความเข้ารหัส
 * @returns {Object} - ข้อมูลที่ถอดรหัสแล้ว
 */
export function decryptAFK(ciphertext) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    return JSON.parse(decrypted)
  } catch {
    return { currency: 0, vip: false, premium: false, history: [] }
  }
}
