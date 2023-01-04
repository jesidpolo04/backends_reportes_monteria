import { InteractionBuilder } from "App/Interactions/InteractionBuilder";
import { InteractionsDictionary } from "App/Interactions/InteractionsDictionary";
import { InteractionsRepository } from "App/Interactions/Repositories/InteractionsRepository";
import ReportsRepository from "../Repositories/ReportsRepository";

export default class FollowAReport{

    public constructor(private reportsRepository:ReportsRepository, private interactionsRepository:InteractionsRepository){
    }

    public async Invoke(reportId:number, userDocument:string):Promise<number>{
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
}