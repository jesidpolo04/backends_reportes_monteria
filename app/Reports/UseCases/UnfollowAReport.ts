import NotFoundException from "App/Exceptions/NotFoundException";
import UnauthorizedException from "App/Exceptions/UnauthorizedException";
import { InteractionsRepository } from "App/Interactions/Repositories/InteractionsRepository";
import ReportsRepository from "../Repositories/ReportsRepository";

export default class UnfollowAReport{

    public constructor(
        private reportsRepository:ReportsRepository,
        private interactionsRepository: InteractionsRepository
    ){}

    public async Invoke(interactionId:number, userDocument:string):Promise<number>{
        const interaction = await this.interactionsRepository.getInteractionById(interactionId)
        if(!interaction){
            throw new NotFoundException()
        }
        if(userDocument !== interaction.userDocument){
            throw new UnauthorizedException()
        }
        await this.interactionsRepository.deleteInteraction(interaction)
        return this.reportsRepository.updateReportFollows(interaction.reportId, 'unfollow')
    }
}