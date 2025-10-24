import bcrypt from "bcrypt";
export const passwordVerify = async()=> {

}

export const hashPassword = async(password: string):Promise<string> =>{
    return await bcrypt.hash(password, 10)
}