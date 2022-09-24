import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import InteractionType from 'App/Interactions/InteractionTypes/InteractionType'

export default class extends BaseSeeder {
  public async run () {
    await InteractionType.createMany([
      {
        id: 1,
        interaction: "Feed"
      }
    ])
  }
}
