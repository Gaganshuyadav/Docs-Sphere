import { Sequelize } from "sequelize-typescript";
import { env } from "./env.config.js";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sequelize = (env.NODE_ENV === "test" || env.NODE_ENV === "development") ? (new Sequelize(env.DATABASE, env.USER, env.PASSWORD, {
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    dialect: "postgres",
    username: env.USER,
    logging: true,
    define: {
        freezeTableName: true
    }
}))
    :
        (new Sequelize(env.DATABASE_URL, {
            database: env.DATABASE,
            username: env.USER,
            password: env.PASSWORD,
            dialect: "postgres",
            define: {
                freezeTableName: true
            },
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                }
            },
            logging: false,
        }));
export default sequelize;
