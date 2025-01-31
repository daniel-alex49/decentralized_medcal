import CryptoJS from "crypto-js"

export function encryptMessage(message: string, password: string): string {
  return CryptoJS.AES.encrypt(message, password).toString()
}

export function decryptMessage(
  encryptedMessage: string,
  password: string
): string {
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, password)
  return bytes.toString(CryptoJS.enc.Utf8)
}
