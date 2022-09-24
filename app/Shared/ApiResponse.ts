export default class ApiResponse<T>{
    public message:string
    public status:number
    public object?:T

    public constructor(message:string, status:number, object?:T){
        this.message = message,
        this.status = status,
        this.object = object
    }
}