import UseCase from "App/Shared/UseCase";
import { EmailService } from "../EmailService";
import { EmailTarget } from "App/Types/EmailTarget";
import { SearchUserService } from "App/Users/Services/SearchUserService";
import Report from "App/Reports/Report";
import ReportsRepository from "App/Reports/Repositories/ReportsRepository";
import { Exception } from "@adonisjs/core/build/standalone";
import ReportType from "App/ReportTypes/ReportType";
import ReportTypesRepository from "App/ReportTypes/Repositories/ReportTypesRepository";

export class SendReportResponseEmail extends UseCase {

    constructor(private reportsRepository: ReportsRepository, private typesRepository: ReportTypesRepository) { super() }

    async Invoke(target: EmailTarget, reportId: number, message: string) {
        let cc: string[] = [];
        const report = await this.getReport(reportId)
        const type = await this.getReportType(reportId)
        const subject = `${type.type} ${report.address}`
        if (target == "all") cc = await this.getCc(reportId);
        await EmailService.sendEmailWithTemplate(
            subject,
            message,
            await this.getTo(reportId),
            cc
        )

    }

    private async getTo(reportId: number): Promise<string> {
        const user = await SearchUserService.searchUserThatMakesReport(reportId)
        return user.email
    }

    private async getCc(reportId: number): Promise<string[]> {
        const users = await SearchUserService.searchUsersThatFollowReport(reportId)
        return users.map(user => user.email)
    }

    private async getReport(reportId: number): Promise<Report> {
        const report = await this.reportsRepository.getReportById(reportId)
        if (report) {
            return report
        }
        throw new Exception(`Report ${reportId} not found`)
    }

    private async getReportType(typeId: number): Promise<ReportType> {
        return await this.typesRepository.getById(typeId)
    }
}