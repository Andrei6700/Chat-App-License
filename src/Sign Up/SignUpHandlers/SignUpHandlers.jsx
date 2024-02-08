import axios from 'axios';
import EncryptionSignUp from '../../Encryption-SignUp/Encryption/encryption';
import DecryptionSignUp from '../../Encryption-SignUp/Decryption/decryption';
import { key } from '../../Encryption-SignUp/Key/Key';

const decrypt = DecryptionSignUp();

export const OnSubmit = async (data) => {
    // formează datele
    const displayName = data.displayName;
    const email = data.email;
    const password = data.password;

    // cripteaza datele
    const encryptedEmail = EncryptionSignUp.encrypt(email, key);
    const encryptedPassword = EncryptionSignUp.encrypt(password, key);
    
    // decripteaza emailul
    const decryptedEmail = decrypt(encryptedEmail.reversedBinaryCodesEmail);
    console.log("Email decriptat: " + decryptedEmail); // Afișează emailul decriptat în consolă

    // Trimite datele la server
    try {
        const response = await axios.post('http://localhost:3001/signup', {
            displayName: displayName,
            email: decryptedEmail, // Trimite emailul decriptat
            password: encryptedPassword, // parola criptată
        }, { withCredentials: true });
        
        console.log(response.data);
    } catch (error) {
        console.log(error);
        alert(error);
    }
};
