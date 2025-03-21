import { Table, Column, DataType, Model, HasMany, BelongsToMany, Scopes } from "sequelize-typescript";
import { UserRoleEnum } from "../utils/types/enum/role-enum.js";

import { UserRole} from "./user-role.model.js";
import { DocumentUser } from "./document-user.model.js";
import { Role} from "./role.model.js";
import { Document} from "./document.model.js";
import { RefreshToken} from "./refresh-token.model.js";

@Scopes(() => ({
    withRoles:{
        include:[
            {
            model: UserRole,
            attributes: [ "createdAt", "updatedAt"],
            include: [Role],
            }
        ]
    }
}))


@Table({ 
    timestamps:true, 
    modelName:"User",
    tableName: "user",
    underscored: true                                   //Sequelize will automatically convert camelCase property names in your model to snake_case column names in the database.
})


class User extends Model{

    @Column({ type: DataType.STRING})
    email!: string;

    @Column({ type: DataType.STRING})
    password!: string;

    @Column({ 
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    isVerified!: boolean;

    @Column({ type: DataType.STRING})
    verificationToken!: string;

    @Column({ type: DataType.STRING})
    passwordResetToken!: string;



    @HasMany(()=>RefreshToken, {
        onDelete: 'CASCADE'
    })
    refreshTokens!: Array<RefreshToken>




    @BelongsToMany(()=> Role, { 
        through:{
            model: ()=>UserRole
        }
    })
    roles!: Array<Role>


    @HasMany(()=> UserRole, {
        onDelete: 'CASCADE'
    })
    userRoles!: Array<UserRole>




    
    @BelongsToMany(()=> Document,{
        through:{
            model: ()=>DocumentUser
        }
    })
    documents!: Array<Document>


    @HasMany(()=> DocumentUser, {
        onDelete: "CASCADE",
    })
    sharedDocuments!: Array<DocumentUser>;
    


}

export { User} ;




