import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NoLocationProvidedException extends Exception {
    constructor(){
        const message = "Must to supply, latitude and longitude for this request"
        super(message,  400)
    }

    public async handle(error: this, ctx: HttpContextContract) {
        ctx.response.status(error.status).send({
            'message': error.message,
        })
      }
}
