export default class CreateApiKeyRequest{
    application:string

    public setDtoFromRequest(request:any){
        this.application = request['application']
    }
}