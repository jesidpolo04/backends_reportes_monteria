import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class InvalidTokenException extends Exception {


    constructor(message:string){
        super(message,  401 )
    }

    public async handle(error: this, ctx: HttpContextContract) {
        ctx.response.status(error.status).send({
            'message': error.message,
        })
      }
}
