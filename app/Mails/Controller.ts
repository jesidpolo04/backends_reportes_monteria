import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { SendReportResponseEmail } from "./UseCases/SendReportResponseEmail";
import ReportTypesRepository from "App/ReportTypes/Repositories/ReportTypesRepository";
import ReportsRepository from "App/Reports/Repositories/ReportsRepository";
import { SendEmailRequest } from "./Dtos/SendEmailRequest";

export default class MailsController {

    private typesRepository: ReportTypesRepository;
    private reportsRepository: ReportsRepository;

    constructor() {
        this.typesRepository = new ReportTypesRepository()
        this.reportsRepository = new ReportsRepository()
    }

    async send({ request, response }: HttpContextContract) {
        const { target, reportId, message } = request.body() as SendEmailRequest
        const useCase = new SendReportResponseEmail(this.reportsRepository, this.typesRepository)
        await useCase.Invoke(target, reportId, message)
        response.status(200).send({
            message: 'Email sended'
        })
    }
} 