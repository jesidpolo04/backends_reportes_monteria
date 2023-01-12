import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JWTAuthService from 'App/Auth/JWT/JWTAuthService'

export default class JWTMiddleware {
  private service:JWTAuthService
  constructor(){
    this.service = new JWTAuthService()
  }
  public async handle(context: HttpContextContract, next: () => Promise<void>) {
    const HEADER_AUTHORIZATION = context.request.header('Authorization')
    if(!HEADER_AUTHORIZATION || HEADER_AUTHORIZATION == ""){
      throw new Exception("Unauthorized, non set token", 401)
    }
    
    if(!await this.service.isValidToken(HEADER_AUTHORIZATION.split(' ')[1])){
      throw new Exception("Unauthorized, invalid token", 401)
    }

    await next()
  }
}
