import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import ReportsRepository from "../Repositories/ReportsRepository";
import { SimulateReports } from "../UseCases/SimulateReports";

export default class ReportsSimulateController {
    private reportsRepository = new ReportsRepository()

    simulate({request, response}:HttpContextContract){
        const {time, quantity} = request.body() as {time: number, quantity: number}
        const useCase = new SimulateReports(this.reportsRepository)
        useCase.Invoke(time, quantity)
        response.status(200).send('Simulation started.')
    }
}