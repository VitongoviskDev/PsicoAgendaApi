// mail.service.ts
import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendEmail(options: {
        to: string
        subject: string
        template: string
        context: Record<string, any>
    }) {
        await this.mailerService.sendMail({
            to: options.to,
            subject: options.subject,
            template: options.template,
            context: options.context,
        })
    }

    async sendVerificationEmail(email: string, name: string, code: string) {
        const url = `${process.env.FRONT_URL}/verify-email?token=${code}`

        return this.sendEmail({
            to: email,
            subject: 'Confirme seu email',
            template: 'verify-email',
            context: { name, url, code },
        })
    }
}
