import axios from 'axios';
import EncryptionSignUp from '../../Encryption-SignUp/Encryption/encryption';
import DecryptionSignUp from '../../Encryption-SignUp/Decryption/decryption';
import { key } from '../../Encryption-SignUp/Key/Key';

//  functia de decriptare
const decrypt = DecryptionSignUp();

export const OnSubmit = async (data) => {
    // datele
    const displayName = data.displayName;
    const email = data.email;
    const password = data.password;

    // criptarea datelor
    const encryptedEmail = EncryptionSignUp.encrypt(email, key);
    const encryptedPassword = EncryptionSignUp.encrypt(password, key);
    
    // decriptarea emailul
    const decryptedEmail = decrypt(encryptedEmail.reversedBinaryCodesEmail, key);
    console.log("Email decriptat: " + decryptedEmail); //  emailul decriptat 

    // Trimite datele la server
    try {
        const response = await axios.post('http://localhost:3001/signup', {
            displayName: displayName,
            email: decryptedEmail, // Trimite emailul decriptat
            password: encryptedPassword, //parola criptata
        }, { withCredentials: true });
        
        console.log(response.data);
    } catch (error) {
        console.log(error);
        alert(error);
    }
};
