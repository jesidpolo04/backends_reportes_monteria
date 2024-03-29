import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import UserTokenPayload from './UserTokenPayload';
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Users/User';
import InvalidTokenException from './Exceptions/InvalidTokenException';

export default class JWTAuthService {

    private options:SignOptions

    public constructor(){
        this.options = {
            expiresIn: '24h'
        }
    }

    public async generateToken(user:User):Promise<string>{
        let tokenPayload:UserTokenPayload = new UserTokenPayload({
            name: user.name,
            last_name: user.lastName,
            rol: user.rolId,
            document: user.document
        })
        return await jwt.sign( tokenPayload.getPlainObjectPayload(), Env.get('JWT_SECRET') , this.options )
    }

    public async getPayload(token:string):Promise<UserTokenPayload>{
        try{

            const payload = await jwt.verify(token, Env.get('JWT_SECRET'), {complete: true}).payload as JwtPayload
            return new UserTokenPayload(
                {
                    name: payload.name, 
                    last_name: payload.last_name,
                    document: payload.document,
                    rol: payload.rol
                })
        }catch(e){
            throw new InvalidTokenException('The authorization token is invalid or expired')
        }
    }

    public async isValidToken(token:string):Promise<boolean>{
        try{
            await jwt.verify(token, Env.get('JWT_SECRET'))
            return true
        }catch(e){
            return false
        }
    }

}