import User from "App/Users/User"

export default class UserTokenPayload{
    private name:string
    private last_name:string
    private document:string
    private rol:number

    public constructor(
        {name, last_name, document, rol}:{name:string, last_name:string, document:string, rol:number}
    ){
        this.name = name
        this.last_name = last_name
        this.document = document
        this.rol = rol
    }

    public setPayloadFromUser(user:User):void{
        this.name = user.name
        this.last_name = user.lastName
        this.document = user.document
        this.rol = user.rolId
    }

    public getPayload():object{
        return {
            name: this.name,
            last_name: this.last_name,
            document: this.document,
            rol_id: this.rol
        }
    }
}