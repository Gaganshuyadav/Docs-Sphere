import { Column, DataType, Table, Model, BelongsTo, BelongsToMany, HasMany } from "sequelize-typescript";
import { UserRoleEnum } from "../utils/types/enum/role-enum.js";
import { UserRole} from "./user-role.model.js";
import { User} from "./user.model.js";



@Table({ timestamps:false, modelName: "Role", tableName:"role", underscored: true})

class Role extends Model{

    @Column({
        type: DataType.ENUM( ...Object.values( UserRoleEnum)),    
    })
    name!: UserRoleEnum

    @BelongsToMany(()=> User, {
        through: {
            model: ()=> UserRole,
        }
    })
    users!: Array<User>

    @HasMany(()=> UserRole, {
        onDelete: "CASCADE",
    })
    roleUsers!: Array<UserRole>;




}


export { Role};

