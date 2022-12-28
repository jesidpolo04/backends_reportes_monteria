import { schema, rules } from '@ioc:Adonis/Core/Validator'

export enum documentTypes {
    CEDULA = 'CC',
    TARJETA_IDENTIDAD = 'TI'
}

export const userSchema = schema.create({
    name: schema.string(undefined, [rules.required()]),
    last_name: schema.string(undefined, [rules.required()]),
    document_type: schema.enum(Object.values(documentTypes), [rules.required()]),
    document: schema.string(undefined, [rules.required()]),
    phone: schema.string(undefined, [rules.mobile()]),
    email: schema.string(undefined, [rules.email(), rules.required()]),
    password: schema.string(undefined, [rules.required()])
  })