import { Exception } from "@adonisjs/core/build/standalone";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import ApiResponse from "App/Shared/ApiResponse";
import HTTP_RESPONSE_CODES from "App/Shared/HttpStatus";

export default class DocumentAlreadyExistsException extends Exception {
    
    public document:string

    public constructor(message:string, document:string){
        super(message, HTTP_RESPONSE_CODES.BAD_REQUEST)
        this.document = document
    }

    public async handle(error: this, ctx: HttpContextContract) {
        let response = new ApiResponse(this.message, this.status)
        ctx.response.status(response.status).send(response)
    }
}