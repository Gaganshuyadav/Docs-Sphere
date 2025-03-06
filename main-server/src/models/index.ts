import { Sequelize } from "sequelize";
import sequelize from "../config/db.config.js";
import {UserRole} from "./user-role.model.js";
import { DocumentUser } from "./document-user.model.js";
import { Role} from "./role.model.js";
import {RefreshToken} from "./refresh-token.model.js";
import { Document} from "./document.model.js";
import { User} from "./user.model.js";


sequelize.addModels([ 
    User,
    UserRole,
    Role,
    RefreshToken,
    Document,
    DocumentUser
])



//UserRole
UserRole.belongsTo(User, { foreignKey: "userId"});
UserRole.belongsTo(Role, { foreignKey:"roleId"});

//DocumentUser
DocumentUser.belongsTo(User, { foreignKey: "userId"});
DocumentUser.belongsTo(Document, { foreignKey:"documentId"});

//user with refresh token
RefreshToken.belongsTo( User, { foreignKey: "userId"});


const db = {
    User,
    UserRole,
    Role,
    RefreshToken,
    Document,
    DocumentUser,
    Sequelize,
    sequelize,
}

export default db;