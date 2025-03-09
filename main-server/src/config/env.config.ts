import dotenv from "dotenv";
dotenv.config();


if( 
    process.env.NODE_ENV === undefined ||
    process.env.HOST === undefined ||
    process.env.PORT === undefined ||
    process.env.DATABASE_URL === undefined ||
    process.env.USER === undefined ||
    process.env.DATABASE === undefined ||
    process.env.PASSWORD === undefined ||
    process.env.DB_HOST === undefined ||
    process.env.DB_PORT === undefined ||
    process.env.JWT_SECRET == undefined ||
    process.env.VITE_SERVER === undefined ||
    process.env.FROM_EMAIL === undefined ||
    process.env.PASSWORD_EMAIL === undefined
){
    
    throw new Error("Environment variables missing.");//do it
}

const env = {
    NODE_ENV : process.env.NODE_ENV ,
    HOST : process.env.HOST ,
    PORT : process.env.PORT ,
    DATABASE_URL : process.env.DATABASE_URL ,
    USER : process.env.USER ,
    DATABASE : process.env.DATABASE ,
    PASSWORD : process.env.PASSWORD ,
    DB_HOST : process.env.DB_HOST ,
    DB_PORT : process.env.DB_PORT ,
    JWT_SECRET : process.env.JWT_SECRET,
    VITE_SERVER : process.env.VITE_SERVER,
    FROM_EMAIL: process.env.FROM_EMAIL,
    PASSWORD_EMAIL: process.env.PASSWORD_EMAIL

}



export { env};
