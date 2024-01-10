import { AES, enc } from 'crypto-js';
import { decryptionKEY } from './decryptionKEY';

export function decrypt(ciphertext) {
    if (ciphertext.startsWith('encrypted:')) {
    //   console.log("meajul criptat", ciphertext); 
      return AES.decrypt(ciphertext.slice(10), decryptionKEY).toString(enc.Utf8);
    } else {
      // returneaza mesajul daca nu e criptat
      // criptarea am adaugat-o dupa foarte mult timp
    //   console.log("mesaj decriptat", ciphertext); 
      return ciphertext;
    }
}