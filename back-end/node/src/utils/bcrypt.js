import pkg from "bcryptjs";

const {hash} = pkg;
const encrypt = async (password) =>{

    const passwordEncrypt = await hash(password,8);
    return passwordEncrypt;
}

export default encrypt;