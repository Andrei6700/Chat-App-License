const key = require('../Key/Key');

const DecryptionSignUp = () => {
  const fromAsciiCodes = (asciiCodes) => {
    return asciiCodes.map(code => String.fromCharCode(code)).join('');
  };

  const fromReversedBinary = (reversedBinary) => {
    let binary = reversedBinary.split('').reverse().join('');
    let num = parseInt(binary, 2);
    return num;
  };

  const decrypt = (reversedBinaryCodes, key) => {
    let asciiCodes = reversedBinaryCodes.map(fromReversedBinary);
    let cipherText = fromAsciiCodes(asciiCodes);
    let plainText = '';

    let j = 0;
    for (let i = 0; i < cipherText.length; i++) {
      let currentChar = cipherText[i];
      let charCode = currentChar.charCodeAt();
      let keyShift = key[j % key.length].charCodeAt();
      let decryptedChar = (charCode - keyShift + 65536) % 65536;
      plainText += String.fromCharCode(decryptedChar);
      j++;
    }

    return plainText;
  };

  return decrypt;
}

module.exports = DecryptionSignUp;
