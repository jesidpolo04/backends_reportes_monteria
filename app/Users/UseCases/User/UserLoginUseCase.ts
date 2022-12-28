import JWTAuthService from "App/Auth/JWT/JWTAuthService";
import UseCase from "App/Shared/UseCase";
import InvalidCredentialsException from "App/Users/Exceptions/InvalidCredentialsException";
import UsersRepository from "App/Users/Repositories/UsersRepository";
import PasswordService from "App/Users/Services/PasswordService";
import User from "App/Users/User";
import Hash  from "@ioc:Adonis/Core/Hash"

export default class UserLoginUseCase extends UseCase{
    private usersRepository:UsersRepository
    private jwtService:JWTAuthService

    public constructor(usersRepository:UsersRepository, jwtService:JWTAuthService){
        super()
        this.usersRepository = usersRepository

        this.jwtService = jwtService
    }

    public async execute(documentOrEmail:string, password:string):Promise<string>{
        let user = await this.tryWithDocument(documentOrEmail)
        if(user){
            if(await Hash.verify(user.password, password)){
                return this.jwtService.generateToken(user)
            }
        }
        user = await this.tryWithEmail(documentOrEmail)
        if(user){
            if(await Hash.verify(user.password, password)){
                return this.jwtService.generateToken(user)
            }
        }
        throw new InvalidCredentialsException(`Invalid credentials`)
    }

    private async tryWithEmail(email):Promise<User | null>{
        return this.usersRepository.byEmail(email)
    }

    private async tryWithDocument(document):Promise<User | null>{
        return this.usersRepository.byDocument(document)
    }
}