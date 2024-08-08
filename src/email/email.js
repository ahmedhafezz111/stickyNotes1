import nodemailer from 'nodemailer'
import { emailHTML } from './emailHTML.js';
import jwt from 'jsonwebtoken'

export const sendMail = async (email)=>{
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
          user: "ahmedhafez1174@gmail.com",
          pass: "agefxcahfmbpdbbr",
        },
      });
      jwt.sign({email},'hafez', async(err,token)=>{
        const info = await transporter.sendMail({
          from: '"Ahmed Hafez  👻" <gmail>', // sender address
          to: email, // list of receivers
          subject: "Hello ✔", // Subject line
          html: emailHTML(token), // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      })
      
    
}
