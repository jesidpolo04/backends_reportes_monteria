import { Exception } from '@adonisjs/core/build/standalone'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import JWTAuthService from 'App/Auth/JWT/JWTAuthService'

export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public async register () {
  }

  public async boot () {
    const Request = this.app.container.use('Adonis/Core/Request')
    Request.macro('getJWTPayload', async function () {
      const serviceJWT = new JWTAuthService()
      const authorization = this.header('Authorization')
      const jwt = authorization!.split(' ')[1]
      const payload = await serviceJWT.getPayload(jwt)
      return payload
    })
  }

  public async ready () {
    
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
