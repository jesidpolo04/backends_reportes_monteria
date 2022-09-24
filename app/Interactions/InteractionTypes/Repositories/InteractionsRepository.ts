import InteractionType from "../InteractionType";

export default class InteractionTypesRepository{
    public async getAllInteractionsTypes():Promise<InteractionType[]>{
        return await InteractionType.all()
    }
}