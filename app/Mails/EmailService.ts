import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'

export class EmailService {

    static sendEmailWithTemplate(subject:string, message:string, to:string, cc:string[]) {
        Mail.send((mail) => {
            mail
            .from(Env.get('SMTP_USERNAME'), 'Sinurep')
            .to(to)
            .subject(subject)
            .text(message)
            .cc(cc.join(','))
        })
    }

}