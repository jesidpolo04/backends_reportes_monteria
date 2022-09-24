import bcrypt from 'bcrypt'

export default class PasswordService{
    private saltRounds = 5;

    public constructor(){
    }

    public async hashPassword(password:string):Promise<string>{
        return await bcrypt.hash(password, this.saltRounds)
    }

    public async isEqual(password:string, hashedPassword:string):Promise<boolean>{
        return await bcrypt.compare(password, hashedPassword)
    }
}