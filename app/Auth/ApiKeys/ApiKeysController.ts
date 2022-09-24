import ApiKeysRepository from "./Repositories/ApiKeysRepository";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext"
import CreateApiKeyRequest from "./Dtos/CreateApiKeyRequest";
import CreateApiKey from "./UseCases/CreateApiKey";
import ApiKey from "./ApiKey";
import CreateApiKeyResponse from "./Dtos/CreateApiKeyResponse";

export default class ApiKeyController{
    public repository:ApiKeysRepository
    public constructor(){
        this.repository = new ApiKeysRepository()
    }
    public async getByKey(context:HttpContextContract){
        await this.repository.getApiKey('123');
        context.response.status(200).send({ok:"ok"})
    }
    public async createKey(context:HttpContextContract){
        const request = context.request.all()
        const createApiKeyRequest:CreateApiKeyRequest = new CreateApiKeyRequest()
        createApiKeyRequest.setDtoFromRequest(request);
        const createApiKey:CreateApiKey = new CreateApiKey(this.repository)
        const apiKey:ApiKey = await createApiKey.Invoke(createApiKeyRequest)
        const createApiKeyResponse = new CreateApiKeyResponse()
        createApiKeyResponse.setDtoFromApiKey(apiKey)
        context.response.status(201).send(createApiKeyResponse)
    }
}