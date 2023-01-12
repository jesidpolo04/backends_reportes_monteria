import { InteractionBuilder } from "App/Interactions/InteractionBuilder";
import { InteractionsDictionary } from "App/Interactions/InteractionsDictionary";
import { InteractionsRepository } from "App/Interactions/Repositories/InteractionsRepository";
import ReportsRepository from "../Repositories/ReportsRepository";
import { Exception } from "@adonisjs/core/build/standalone";

export default class FollowAReport{

    public constructor(private reportsRepository:ReportsRepository, private interactionsRepository:InteractionsRepository){
    }

    public async Invoke(reportId:number, userDocument:string):Promise<number>{
        if(await this.alreadyFollowReport(userDocument, reportId, InteractionsDictionary.FEED)) 
            throw new Exception(`this user (${userDocument}) already follows the report: ${reportId}`, 400);  
        await this.createInteraction(reportId, userDocument)
        return this.reportsRepository.updateReportFollows(reportId, 'follow')
    }

    private async createInteraction(reportId:number, userDocument:string):Promise<void>{
        const builder = new InteractionBuilder()
        await this.interactionsRepository.saveInteraction(builder.build(
            reportId, 
            userDocument,
            InteractionsDictionary.FEED
        ))
    }

    private async alreadyFollowReport(document, reportId, interactionTypeId):Promise<boolean>{
        const interactions = await this.interactionsRepository.getInteractions({
            document,
            interactionTypeId,
            reportId
        })
        return interactions.length > 0 ? true : false 
    }
}