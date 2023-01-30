import { EmailTarget } from "App/Types/EmailTarget";

export interface SendEmailRequest{
    target: EmailTarget
    message: string
    reportId: number
}