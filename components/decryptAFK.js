import CryptoJS from "crypto-js"

const secretKey = "afk_super_secret"

function decryptAFK(ciphertext) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    return JSON.parse(decrypted)
  } catch {
    return { currency: 0, vip: false, premium: false, history: [] }
  }
}
