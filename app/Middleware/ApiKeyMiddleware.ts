import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiKeysService from 'App/Auth/ApiKeys/ApiKeysService'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'

export default class ApiKeyMiddleware {
  private service:ApiKeysService
  constructor(){
    this.service = new ApiKeysService()
  }
  public async handle(context: HttpContextContract, next: () => Promise<void>) {
    const HEADERAPIKEY = context.request.header('API-KEY')
    if(!HEADERAPIKEY || HEADERAPIKEY == ""){
      throw new UnauthorizedException("Unauthorized, non set api key")
    }
    
    if(!await this.service.verifyApiKey(HEADERAPIKEY)){
      throw new UnauthorizedException("Unauthorized, invalid api key")
    }

    await next()
  }
}
