import ApiKey from "../ApiKey";
import CreateApiKeyRequest from "../Dtos/CreateApiKeyRequest";
import ApiKeysRepository from "../Repositories/ApiKeysRepository";

export default class CreateApiKey{
    private repository: ApiKeysRepository
    constructor(repository:ApiKeysRepository){
        this.repository = repository
    }

    public async Invoke(application:string):Promise<ApiKey>{
        return await this.repository.createApiKey(application)
    }
}