export class SearchReportsParameters{
    public readonly type?:number
    public readonly followsOrder?:Order
    public readonly document?:string
    public readonly lat?:number //latitud
    public readonly lon?:number //longitud
    public readonly proximity?:number //proximidad en metros
    public readonly date: string
}