import User from "../User";

export default class UsersRepository{

    public async save(user:User){
        user = await user.save()
        return user
    }

    public async byDocument(document:string):Promise<User|null>{
        return await User.findBy('document', document)
    }

    public async byEmail(email:string):Promise<User|null>{
        return await User.findBy('email', email)
    }
}