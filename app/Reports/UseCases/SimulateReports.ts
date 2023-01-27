import UseCase from "App/Shared/UseCase";
import ReportsRepository from "../Repositories/ReportsRepository";
import { ReportsGenerator } from "../ReportsGenerator";
import Ws from "App/Socket/Services/Ws";
import ReportDto from "../Dtos/ReportDto";

export class SimulateReports extends UseCase {
    constructor(private reportsRepository: ReportsRepository) {
        super()
    }

    async Invoke(timeInSecs: number, numberOfReports: number) {
        for (let i = 0; i < numberOfReports; i++) {
            let report = ReportsGenerator.generate()
            let milisecondsUntilExecution = this.getRandomInARange(0, timeInSecs) * 1000
            setTimeout(async () => {
                console.log(`Reporte generado en ${report.latitude}, ${report.longitude}`)
                Ws.io.emit('new:report', new ReportDto(report))
            }, milisecondsUntilExecution)
        }
    }

    private getRandomInARange(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}