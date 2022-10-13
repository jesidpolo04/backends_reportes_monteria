import { schema, rules } from '@ioc:Adonis/Core/Validator'

const reportSchema = schema.create({
  type: schema.number(),
  address: schema.string(undefined, [rules.minLength(5)]),
  reference: schema.string(undefined, [rules.minLength(5)]),
  latitude: schema.number(),
  longitude: schema.number(),
  description: schema.string(),
  email: schema.string(undefined, [rules.email()]),
  user_document: schema.string({trim: true}, [rules.minLength(6)]),
  images: schema.array([rules.minLength(1)]).members(schema.file({extnames: ['jpg', 'png', 'jpeg']})),
})

export {reportSchema};