import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiKeysService from 'App/Auth/ApiKeys/ApiKeysService'

export default class ApiKeyMiddleware {
  private service:ApiKeysService
  constructor(){
    this.service = new ApiKeysService()
  }
  public async handle(context: HttpContextContract, next: () => Promise<void>) {
    const HEADERAPIKEY = context.request.header('API-KEY')
    if(!HEADERAPIKEY || HEADERAPIKEY == ""){
      throw new Exception("Unauthorized, non set api key", 401)
    }
    
    if(!await this.service.verifyApiKey(HEADERAPIKEY)){
      throw new Exception("Unauthorized, invalid api key", 401)
    }

    await next()
  }
}
