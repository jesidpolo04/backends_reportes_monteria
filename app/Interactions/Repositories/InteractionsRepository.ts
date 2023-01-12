import { Exception } from "@adonisjs/core/build/standalone";
import { Interaction } from "../Interaction";

export class InteractionsRepository{

    public async getInteractions(
        {document, interactionTypeId, reportId}:
        {document?:string, interactionTypeId?:number, reportId?:number}):Promise<Interaction[]>{
        const query = Interaction.query()
        if(document){
            query.where('userDocument', document)
        }
        if(interactionTypeId){
            query.andWhere('interactionTypeId', interactionTypeId)
        }
        if(reportId){
            query.andWhere('reportId', reportId)
        }
        return await query
    }

    public async getInteractionById(id:number){
        try{
            return await Interaction.find(id)
        }catch(e){
            throw new Exception(`An error ocurred at get the interaction with id: ${id}`, 500)
        }
    }

    public async saveInteraction(interaction:Interaction){
        try{
            await interaction.save()
        }catch(e){
            throw new Exception("Error at create the interaction", 500)
        }
    }

    public async deleteInteraction(interaction:Interaction){
        try{
            await interaction.delete()
        }catch(e){
            throw new Exception("Error at delete the interaction", 500)
        }
    }
}