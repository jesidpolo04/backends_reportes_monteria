

export class SearchReportsParameters{
    private _type?:number
    private _followsOrder?:Order
    private _document?:string
    private _lat?:number //latitud
    private _lon?:number //longitud
    private _proximity?:number //proximidad en metros

    constructor(type?:number, followsOrder?:Order, document?:string, lat?:number, lon?:number, proximity?:number){
        this._type = type;
        this._followsOrder = followsOrder;
        this._document = document
        this._lat = lat
        this._lon = lon
        this._proximity = proximity
    }

    get type(){
        return this._type
    }

    get followsOrder(){
        return this._followsOrder
    }

    get document(){
        return this._document
    }

    get lat(){
        return this._lat
    }

    get lon(){
        return this._lon
    }

    get proximity(){
        return this._proximity
    }
}