/*Encriptar contraseña*/
import pkg from "bcryptjs";

const {hash} = pkg;
const encrypt = async (password) =>{

    const passwordEncrypt = await hash(password,8);
    return passwordEncrypt;
}
const compareEncript = async (password1,password2) =>{

    const comparte = await pkg.compare(password1,password2)
    return comparte;
}

export default encrypt;