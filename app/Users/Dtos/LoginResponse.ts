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
        this.user.name = user.name
        this.user.lastName = user.lastName
        this.user.document = user.document
        this.user.email = user.email
    }
}