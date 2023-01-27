import { faker } from '@faker-js/faker';
import { Random } from "App/Shared/Random";
import Report from "./Report";

export class ReportsGenerator {
    static generate():Report{
        return Report.instance(
            this.selectRandomType(),
            false,
            faker.address.streetAddress(true),
            '1002999476',
            Number(faker.address.latitude(8.78, 8.72)),
            Number(faker.address.longitude(-75.84, -75.91)),
            faker.lorem.lines(1),
            faker.internet.email(),
            '["https://i1.wp.com/elpilon.com.co/wp-content/uploads/2021/04/Monteria-principal.jpg?fit=1280%2C958&ssl=1"]',
            faker.address.streetAddress()
        )
    }

    private static selectRandomType(){
        return Random.int(1, 3)
    }
}