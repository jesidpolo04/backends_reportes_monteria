import Rol from "App/Auth/Authorization/Roles/Rol";
import UseCase from "App/Shared/UseCase";
import DocumentAlreadyExistsException from "App/Users/Exceptions/DocumentAlreadyExistsException";
import EmailAlreadyExistsException from "App/Users/Exceptions/EmailAlreadyExistsException";
import UsersRepository from "App/Users/Repositories/UsersRepository";
import User from "App/Users/User";

export default class RegisterUserUseCase extends UseCase{

    private usersRepository:UsersRepository;
    
    public constructor(usersRepository:UsersRepository){
        super()
        this.usersRepository = usersRepository;
    }

    public async execute(
        name:string, 
        lastName:string, 
        documentType:string, 
        document:string,
        phone:string,
        email:string, 
        password:string):Promise<User>{

        await this.isValidDocument(document)
        await this.isValidEmail(email)

        let user = new User()
        user.name = name
        user.lastName = lastName
        user.documentType = documentType
        user.document = document
        user.phone = phone
        user.email = email
        user.password = password
        user.rolId = Rol.ROLES.USER

        return await this.usersRepository.save(user);
    }

    private async isValidEmail(email:string){
        if(await this.usersRepository.byEmail(email)){
            throw new EmailAlreadyExistsException(`El email ${email} ya está asociado a un usuario`, email)
        }
    }

    private async isValidDocument(document:string){
        if(await this.usersRepository.byDocument(document)){
            throw new DocumentAlreadyExistsException(`El documento: ${document} ya está asociado a un usuario`, document)
        }
    }
}