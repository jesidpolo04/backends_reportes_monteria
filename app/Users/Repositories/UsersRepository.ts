import User from "../User";

export default class UsersRepository {

    public async save(user: User) {
        user = await user.save()
        return user
    }

    public async byDocument(document: string): Promise<User | null> {
        return await User.findBy('document', document)
    }

    public async byEmail(email: string): Promise<User | null> {
        return await User.findBy('email', email)
    }

    public async searchUsers(
        { followReportId, makeReportId }: 
        { followReportId?: number, makeReportId?: number }
    ):Promise<User[]> {
        const query = User.query()

        if(followReportId){
            query.innerJoin('interactions', 'interactions.user_document', '=', 'users.document')
            .where('interactions.report', followReportId)
        }

        if(makeReportId){
            query.innerJoin('reports', 'reports.user_document', '=', 'users.document')
            .where('reports.id', makeReportId)
        }

        return await query
    }
}