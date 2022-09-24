import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext"
import RegisterUserUseCase from "../UseCases/User/RegisterUserUseCase";
import ApiResponse from "App/Shared/ApiResponse";
import UsersRepository from "../Repositories/UsersRepository";
import PasswordService from "../Services/PasswordService";
import UserLoginUseCase from "../UseCases/User/UserLoginUseCase";
import JWTAuthService from "App/Auth/JWT/JWTAuthService";
import HTTP_RESPONSE_CODES from "App/Shared/HttpStatus";

export default class UsersController{

    private repository:UsersRepository
    private passwordService:PasswordService
    private jwtService:JWTAuthService

    public constructor(){
        this.repository = new UsersRepository()
        this.passwordService = new PasswordService()
        this.jwtService = new JWTAuthService()
    }

    public async login(context:HttpContextContract){
        let request = context.request.all()
        let useCase = new UserLoginUseCase(this.repository, this.passwordService, this.jwtService)
        const token = await useCase.execute(request.user, request.password)
        context.response.status(HTTP_RESPONSE_CODES.OK).send({
            message: "Inicio de sesión correcto",
            token
        })
    }

    public async register(context:HttpContextContract){
        let request = context.request.all()
        let useCase = new RegisterUserUseCase(this.repository, this.passwordService)
        await useCase.execute(
            request.name,
            request.last_name,
            request.document_type,
            request.document,
            request.phone,
            request.email,
            request.password
        )
        let response = new ApiResponse("Registro exitoso!", 201)
        context.response.status(response.status).send(response)
    }
}