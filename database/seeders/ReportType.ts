import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ReportType from '../../app/ReportTypes/ReportType'

export default class extends BaseSeeder {
  public async run () {
    await ReportType.createMany([
      {
        id: 1,
        type: 'Daño en alumbrado público'
      },
      {
        id: 2,
        type: 'Acumulación de basura'
      },
      {
        id: 3,
        type: 'Fallo de semáforo'
      }
    ])
  }
}
