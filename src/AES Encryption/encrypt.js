import { AES } from 'crypto-js';
import { decryptionKEY } from './decryptionKEY';

export function encrypt(text) {
  return 'encrypted:' + AES.encrypt(text, decryptionKEY).toString();
}