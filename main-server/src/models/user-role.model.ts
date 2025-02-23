import { Column, Table, PrimaryKey, BelongsTo, ForeignKey, Model, DataType } from "sequelize-typescript";
import { Role} from "./role.model.js";
import { User} from "./user.model.js";

@Table({ tableName:"user_role", underscored:true})

class UserRole extends Model{

    // @BelongsTo(()=> User)
    // user !: User;

    @ForeignKey(()=> User)
    @PrimaryKey
    @Column
    userId !: number;

    //it is important for taking roles model data, but no need now , cause we declare it in index.js for saving from circulare dependencies, but declaration of name is needed to save it from typescript
    @BelongsTo(()=> Role)
    role!: Role;

    @ForeignKey(()=> Role)
    @PrimaryKey
    @Column
    roleId!: number;

}


export { UserRole } ;


