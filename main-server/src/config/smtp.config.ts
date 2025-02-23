import { createTransport} from "nodemailer";
import { env } from "./env.config.js";

const transport = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth:{
        user: env.FROM_EMAIL,
        pass: env.PASSWORD_EMAIL,
    },
    secure: false
});

export default transport;


