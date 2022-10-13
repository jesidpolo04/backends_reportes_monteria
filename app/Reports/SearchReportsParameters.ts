

export class SearchReportsParameters{
    private _type?:number
    private _followsOrder?:Order

    constructor(type?:number, followsOrder?:Order){
        this._type = type;
        this._followsOrder = followsOrder;
    }

    get type(){
        return this.type
    }

    get followsOrder(){
        return this._followsOrder
    }
}