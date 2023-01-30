import { Exception } from "@adonisjs/core/build/standalone";
import UsersRepository from "../Repositories/UsersRepository";
import User from "../User";

export class SearchUserService {
    private static userRepository: UsersRepository = new UsersRepository()

    static async searchUsersThatFollowReport(reportId: number): Promise<User[]> {
        return await this.userRepository.searchUsers({ followReportId: reportId })
    }

    static async searchUserThatMakesReport(reportId: number): Promise<User> {
        const users = await this.userRepository.searchUsers({ makeReportId: reportId })
        if(users.length > 0) return users[0];
        throw new Exception(`Can't find the user that makes the report ${reportId}`, 404)
    }
}