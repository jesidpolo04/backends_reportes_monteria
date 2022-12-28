import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServerErrorException extends Exception {
    constructor(){
        const message = "An error was ocurred in the server"
        super(message,  500)
    }

    public async handle(error: this, ctx: HttpContextContract) {
        ctx.response.status(error.status).send({
            'message': error.message,
        })
      }
}
