import User from "App/Users/User"

export default class UserTokenPayload{
    private _name:string;
    private _last_name:string;
    private _document:string;
    private _rol:number;

    public constructor(
        {name, last_name, document, rol}:{name:string, last_name:string, document:string, rol:number}
    ){
        this._name = name
        this._last_name = last_name
        this._document = document
        this._rol = rol
    }

    public setPayloadFromUser(user:User):void{
        this._name = user.name
        this._last_name = user.lastName
        this._document = user.document
        this._rol = user.rolId
    }

    public getPlainObjectPayload():{name:string, last_name:string, document:string, rol:number}{
        return {name: this._name, last_name: this._last_name, document: this._document, rol: this._rol}
    }


	public get name(): string {
		return this._name;
	}
    

	public get last_name(): string {
		return this._last_name;
	}


	public get document(): string {
		return this._document;
	}

	public get rol(): number {
		return this._rol;
	}

}