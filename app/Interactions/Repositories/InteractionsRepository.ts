import { Exception } from "@adonisjs/core/build/standalone";
import { Interaction } from "../Interaction";

export class InteractionsRepository{

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