

export class SearchReportsParameters{
    private _type?:number
    private _followsOrder?:Order
    private _document?:string

    constructor(type?:number, followsOrder?:Order, document?:string){
        this._type = type;
        this._followsOrder = followsOrder;
        this._document = document
    }

    get type(){
        return this.type
    }

    get followsOrder(){
        return this._followsOrder
    }

    get document(){
        return this._document
    }
}