import { Exception } from "@adonisjs/core/build/standalone";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import ApiResponse from "App/Shared/ApiResponse";
import HTTP_RESPONSE_CODES from "App/Shared/HttpStatus";

export default class InvalidCredentialsException extends Exception {

    public constructor(message:string){
        super(message, HTTP_RESPONSE_CODES.BAD_REQUEST)
    }

    public async handle(error: this, ctx: HttpContextContract) {
        let response = new ApiResponse(this.message, this.status)
        ctx.response.status(response.status).send(response)
    }
}