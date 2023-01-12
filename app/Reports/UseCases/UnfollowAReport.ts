import { InteractionsRepository } from "App/Interactions/Repositories/InteractionsRepository";
import ReportsRepository from "../Repositories/ReportsRepository";
import { Interaction } from "App/Interactions/Interaction";
import { Exception } from "@adonisjs/core/build/standalone";
import { InteractionsDictionary } from "App/Interactions/InteractionsDictionary";

export default class UnfollowAReport{

    public constructor(
        private reportsRepository:ReportsRepository,
        private interactionsRepository: InteractionsRepository
    ){}

    public async Invoke(reportId:number, userDocument:string):Promise<number>{
        const follows = await this.getUserFollows(reportId, userDocument)
        if(follows.length <= 0){
            throw new Exception(`this user (${userDocument}) doesn't follow this report: ${reportId}`)
        }
        follows.forEach(async follow => {
            await this.interactionsRepository.deleteInteraction(follow)    
        });
        return this.reportsRepository.updateReportFollows(reportId, 'unfollow')
    }

    private async getUserFollows(reportId, document):Promise<Interaction[]>{
        return await this.interactionsRepository.getInteractions({
            document, 
            reportId, 
            interactionTypeId: InteractionsDictionary.FEED
        })
    }
}