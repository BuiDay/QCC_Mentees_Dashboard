import ejs from 'ejs';
import nodemailer, { Transporter } from 'nodemailer'
import path from 'path';
require('dotenv').config();

interface EmailOption {
    email: string,
    subject: string,
    template: string,
    data: {
        [key: string]: any
    }
}

const sendMail = async (options: EmailOption): Promise<void> => {
    try {
        const transporter: Transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            }
        })
        const { email, subject, template, data } = options;
    
        //get template
        const templatePath = path.join(__dirname,"../mails",template);
        //render the mail template
        const html:string = await ejs.renderFile(templatePath,data);
        const mailOptions = {
            from:{
                name:"QCC MASTERY HUB",
                address:  process.env.SMTP_MAIL,
            },
            cc:email,
            subject,
            html
        }
        await transporter.sendMail(mailOptions,()=>{
            
        });
    } catch (error) {
        console.log(error)
    }
};

export default sendMail


