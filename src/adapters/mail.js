import nodemailer from 'nodemailer'

export const sendMail = (to, subject, content) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'code.or.die2021@gmail.com',
            pass: 'kinwhqugrlbdquf',
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    transporter.sendMail({
        from: 'code.or.die2021@gmail.com',
        to: to,
        subject: subject,
        html: content,
    })
}
