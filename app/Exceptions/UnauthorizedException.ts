import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UnauthorizedException extends Exception {
    constructor(){
        super("You don't have permission to access this resource",  401 )
    }
    public async handle(error: this, ctx: HttpContextContract) {
        ctx.response.status(error.status).send({
            message: error.message,
            status: error.status
        })
      }
}
