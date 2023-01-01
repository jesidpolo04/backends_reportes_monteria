import { Interaction } from "./Interaction";

export class InteractionBuilder {
    public build(reportId:number, userDocument:string, interactionTypeId:number):Interaction{
        const interaction = new Interaction()
        interaction.reportId = reportId
        interaction.userDocument = userDocument
        interaction.interactionTypeId = interactionTypeId
        return interaction
    }
}