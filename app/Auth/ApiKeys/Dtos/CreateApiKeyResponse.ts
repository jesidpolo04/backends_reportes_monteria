import ApiKey from "../ApiKey";

export default class CreateApiKeyResponse{
    
    public api_key

    public setDtoFromApiKey(apiKey:ApiKey){
        this.api_key = apiKey.key
    }
}