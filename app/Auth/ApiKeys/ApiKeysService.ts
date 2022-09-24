import ApiKey from "./ApiKey";
import ApiKeysRepository from "./Repositories/ApiKeysRepository";

export default class ApiKeysService{
    repository:ApiKeysRepository
    public constructor(){
        this.repository = new ApiKeysRepository()
    }

    public async verifyApiKey(apiKey:string):Promise<ApiKey | null>{
        return await this.repository.getApiKey(apiKey)
    }
}