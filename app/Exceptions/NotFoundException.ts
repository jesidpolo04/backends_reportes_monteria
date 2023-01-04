import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class NotFoundException extends Exception {

    constructor(){
        super("We can't found the requested resource",  404 )
    }

    public async handle(error: this, ctx: HttpContextContract) {
        ctx.response.status(error.status).send({
            message: error.message,
            status: error.status
        })
      }
}
