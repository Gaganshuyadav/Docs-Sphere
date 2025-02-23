import Mail from "nodemailer/lib/mailer/index.js";
import transport from "../config/smtp.config.js";


class MailService{

    public sendMail = async ( mailOptions:Mail.Options )=>{

        try{
            await transport.sendMail(mailOptions );
        }
        catch(err){
            console.log(err);
        }
        
    }
}

const mailService = new MailService();

export { mailService};
