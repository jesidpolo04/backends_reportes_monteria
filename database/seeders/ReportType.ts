import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ReportType from '../../app/ReportTypes/ReportType'

export default class extends BaseSeeder {
  public async run () {
    await ReportType.createMany([
      {
        id: 1,
        active: true,
        type: 'Daño en alumbrado público'
      },
      {
        id: 2,
        active: true,
        type: 'Acumulación de basura'
      },
      {
        id: 3,
        active: true,
        type: 'Fallo de semáforo'
      }
    ])
  }
}
