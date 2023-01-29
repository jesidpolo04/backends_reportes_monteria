import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext"
import RegisterUserUseCase from "../UseCases/User/RegisterUserUseCase";
import ApiResponse from "App/Shared/ApiResponse";
import UsersRepository from "../Repositories/UsersRepository";
import PasswordService from "../Services/PasswordService";
import UserLoginUseCase from "../UseCases/User/UserLoginUseCase";
import JWTAuthService from "App/Auth/JWT/JWTAuthService";
import HTTP_RESPONSE_CODES from "App/Shared/HttpStatus";
import { userSchema } from "../Validators/UserValidator";

export default class UsersController{

    private repository:UsersRepository
    private jwtService:JWTAuthService

    public constructor(){
        this.repository = new UsersRepository()
        this.jwtService = new JWTAuthService()
    }

    public async login(context:HttpContextContract){
        let request = context.request.all()
        let useCase = new UserLoginUseCase(this.repository, this.jwtService)
        const loginResponse = await useCase.execute(request.user, request.password)
        const response = new ApiResponse("Login successfully!", 201)
        context.response.status(HTTP_RESPONSE_CODES.OK).send({
            message: response.message,
            token: loginResponse.token,
            user: loginResponse.user
        })
    }

    public async register(context:HttpContextContract){
        let request = await context.request.validate({schema: userSchema})
        let useCase = new RegisterUserUseCase(this.repository)
        await useCase.execute(
            request.name,
            request.last_name,
            request.document_type,
            request.document,
            request.phone,
            request.email,
            request.password
        )
        let response = new ApiResponse("Register successfully!", 201)
        context.response.status(response.status).send(response)
    }
}