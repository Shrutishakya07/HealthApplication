const nodemailer = require('nodemailer')
require('dotenv').config()

const mailSender = async( email, title, body) => {
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })
        let info = await transporter.sendMail({
            from:process.env.MAIL_USER || 'Conference Point ',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`, 
        })
        console.log(info.messageId);
        return info;
    }
    catch(error){
        console.log(error.message);
        throw new Error('Failed to send email');
    }
}

module.exports  = mailSender;