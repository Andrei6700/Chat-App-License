import { AES, enc } from 'crypto-js';
import { decryptionKEY } from './decryptionKEY';

export function decrypt(ciphertext) {
  if (ciphertext && ciphertext.startsWith('encrypted:')) {
     console.log("Mesaj criptat:", ciphertext); 
     try {
       const decryptedData = AES.decrypt(ciphertext.slice(10), decryptionKEY);
       const decryptedMessage = decryptedData.toString(enc.Utf8);
       console.log("Mesaj decriptat:", decryptedMessage);
       return decryptedMessage;
     } catch (error) {
       console.error("Decryption failed:", error);
       return null; 
     }
  } else {
    console.log("Mesaj necriptat:", ciphertext);
    return ciphertext;
  }
}