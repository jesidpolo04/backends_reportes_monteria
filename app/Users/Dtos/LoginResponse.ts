import User from "../User"

export class LoginResponse{
    public readonly token: string 
    public readonly user: {
        name: string,
        lastName: string,
        document: string,
        email: string,
    }

    constructor(token:string, user:User){
        this.token = token
        this.user = {
            name: user.name,
            lastName: user.lastName,
            document: user.document,
            email: user.email
        }
    }
}