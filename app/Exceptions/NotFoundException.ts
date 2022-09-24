import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class NotFoundException extends Exception {

    public resourceId: string | number

    constructor(message:string, resourceId:string | number){
        super(message,  404 )
        this.resourceId = resourceId
    }

    public async handle(error: this, ctx: HttpContextContract) {
        ctx.response.status(error.status).send({
            'message': error.message,
            'resource_id': error.resourceId
        })
      }
}
