import { Sequelize } from "sequelize-typescript";
import { env } from "./env.config.js";
const sequelize = (env.NODE_ENV === "test" || env.NODE_ENV === "development") ? (new Sequelize(env.DATABASE, env.USER, "root", {
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
