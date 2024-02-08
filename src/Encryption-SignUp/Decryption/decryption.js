const key = require('../Key/Key');

const DecryptionSignUp = () => {
  function fromAsciiCodes(asciiCodes) {
    var str = "";
    for (var i = 0; i < asciiCodes.length; i++) {
      str += String.fromCharCode(asciiCodes[i]);
    }
    return str;
  }

  function fromReversedBinary(reversedBinary) {
    console.log("reversedBinary:", reversedBinary); //
    var binary = reversedBinary.split('').reverse().join('');
    var num = parseInt(binary, 2);
    return num;
  }

  var decrypt = function(encryptedText) {
    // decripteaza mesajul folosind vigenere, asa ar trebui
    var decryptedText = "";
    for (var i = 0, j = 0; i < encryptedText.length; i++) {
      var currentChar = encryptedText[i];
      var charCode = currentChar.charCodeAt();
      var keyShift = key && key.length ? key[j % key.length].charCodeAt() : 0;
      var decryptedChar = ((charCode - keyShift + 256) % 256);
      decryptedText += String.fromCharCode(decryptedChar);
      j++;
    }

    // Converteste mesajul decriptat in ASCII
    var asciiCodes = [];
    for (var i = 0; i < decryptedText.length; i++) {
      asciiCodes.push(decryptedText.charCodeAt(i));
    }

    // Converteste ASCII in binar invers
    var reversedBinaryCodes = asciiCodes.map(fromReversedBinary);

    return reversedBinaryCodes;
  };

  return decrypt;
}

module.exports = DecryptionSignUp;
