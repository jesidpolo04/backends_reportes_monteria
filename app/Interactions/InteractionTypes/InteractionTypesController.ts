import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import InteractionType from './InteractionType';
import InteractionTypesRepository from './Repositories/InteractionsRepository'

export default class InteractionTypesController{
    private repository:InteractionTypesRepository
    public constructor(){
        this.repository = new InteractionTypesRepository();
    }
    
    public async getAll(ctx:HttpContextContract){
        let reportTypes:InteractionType[] = await this.repository.getAllInteractionsTypes()
        ctx.response.status(200).send(reportTypes)
    }
}