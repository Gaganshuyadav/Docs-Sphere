import { Column, DataType, ForeignKey, BelongsTo, Table, Model } from "sequelize-typescript";
import { User} from "./user.model.js";

@Table({
    timestamps:true, 
    modelName:"RefreshToken",
    tableName: "refresh_token",
    underscored: true  
})

class RefreshToken extends Model{

    @Column(DataType.STRING)
    token !: string;                                                  // (!)the definite assignment assertion:- It tells the TypeScript compiler that you are confident that this property will be assigned a value before it is accessed, even if TypeScript's control flow analysis cannot guarantee that. ( suppresses strick null checks)

    @ForeignKey(()=>User)
    userId !: number;

    // @BelongsTo(()=>User,{
    //     constraints:false
    // })
    // user !: User;

}

export { RefreshToken} ;

