import nodemailer from "nodemailer"
import fs from "fs"

export async function POST({ request, setHeaders, url }) 
{
    const data = await request.json()

    fs.writeFileSync('./messages.txt',  JSON.stringify(data));

    var transporter = nodemailer.createTransport({
        host: 'app.debugmail.io',
        port: 25,
        auth: {
          user: import.meta.env.VITE_EMAIL_USER,
          pass: import.meta.env.VITE_EMAIL_PASS
        },
        tls: {rejectUnauthorized: false}
    });
      
    var mailOptions = {
        from: 'hunterjisha.notif@gmail.com',
        to: 'hunterjisha@gmail.com',
        subject: 'Website Notification',
        text: `${data.email}`
    };
    
    transporter.sendMail(mailOptions, function(error, info)
    {
        if (error) 
        {
            console.log(error);
        } 
        else 
        {
            console.log("Email Sent");
        }
    })

    console.log(data)

    return {message: "received"}
}