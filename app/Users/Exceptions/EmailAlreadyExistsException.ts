import { Exception } from "@adonisjs/core/build/standalone";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import ApiResponse from "App/Shared/ApiResponse";
import HTTP_RESPONSE_CODES from "App/Shared/HttpStatus";

export default class EmailAlreadyExistsException extends Exception {
    
    public email:string

    public constructor(message:string, email:string){
        super(message, HTTP_RESPONSE_CODES.BAD_REQUEST)
        this.email = email
    }

    public async handle(error: this, ctx: HttpContextContract) {
        let response = new ApiResponse(this.message, this.status)
        ctx.response.status(response.status).send(response)
    }
}