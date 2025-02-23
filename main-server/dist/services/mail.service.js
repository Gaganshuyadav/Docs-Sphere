import transport from "../config/smtp.config.js";
class MailService {
    constructor() {
        this.sendMail = async (mailOptions) => {
            try {
                await transport.sendMail(mailOptions);
            }
            catch (err) {
                console.log(err);
            }
        };
    }
}
const mailService = new MailService();
export { mailService };
