import NotFoundException from "App/Exceptions/NotFoundException";
import ApiKey from "../ApiKey";

export default class ApiKeysRepository{

    public async createApiKey(applicationName:string):Promise<ApiKey>{
        const apiKey = new ApiKey();
        apiKey.application = applicationName;
        apiKey.key = apiKey.generateKey();
        return await apiKey.save()
    }

    public async getApiKey(key:string):Promise<ApiKey | null>{
        const apiKey = await ApiKey.findBy('key', key)
        return apiKey
    }
}