import { key } from '../Key/Key';

console.log(key);

const EncryptionSignUp = {
  encryptText: function (plainText) {
    var cypher = "";
    for (var i = 0, j = 0; i < plainText.length; i++) {
      var currentChar = plainText[i];
      var charCode = currentChar.charCodeAt();
      var keyShift = key[j % key.length].charCodeAt();
      var encryptedChar = ((charCode + keyShift) % 65536);
      cypher += String.fromCharCode(encryptedChar);
      j++;
    }

    return cypher;
  },

  encrypt: function (plainEmail, plainPassword) {
    if (!key || !key.length) {
      console.error("the key is not set!");
      return;
    }
    var encryptedEmail = this.encryptText(plainEmail);
    var encryptedPassword = this.encryptText(plainPassword);
    var asciiCodesEmail = this.toAsciiCodes(encryptedEmail);
    var reversedBinaryCodesEmail = asciiCodesEmail.map(this.toReversedBinary);

    var asciiCodesPassword = this.toAsciiCodes(encryptedPassword);
    var reversedBinaryCodesPassword = asciiCodesPassword.map(this.toReversedBinary);

    console.log("emailul criptat in Vigenere", encryptedEmail);
    console.log("emailul criptat in ASCII",asciiCodesEmail)
    console.log("emailul criptat final", reversedBinaryCodesEmail);

    // console.log("PAROLA criptata", reversedBinaryCodesPassword);

    return {
      encryptedEmail,
      encryptedPassword,
      reversedBinaryCodesEmail,
      reversedBinaryCodesPassword
    };
  },

  toAsciiCodes: function (str) {
    var asciiCodes = [];
    for (var i = 0; i < str.length; i++) {
      asciiCodes.push(str.charCodeAt(i));
    }
    return asciiCodes;
  },

  toReversedBinary: function (num) {
    var binary = num.toString(2);
    var reversedBinary = binary.split('').reverse().join('');
    return reversedBinary;
  }
};

export default EncryptionSignUp;
