import { BelongsTo, Column, DataType, Default, ForeignKey, Table, HasMany, BelongsToMany, Model, Scopes } from "sequelize-typescript";
import { DocumentUser } from "./document-user.model.js";
import { User} from "./user.model.js";



@Scopes(()=> ({ 
    withUsers:{
        include: [
            {
                model: DocumentUser,
                include:[
                    {
                        model: User,
                        attributes: ["email"],
    
                    }
                ]
            }
        ]
    }
}))

@Table({ timestamps: true, tableName: "document", underscored:true})

class Document extends Model{

    @Column(DataType.STRING)
    title !: string;

    @Column({
        type: DataType.JSONB
    })
    content !: string;

    @ForeignKey(()=> User)
    @Column
    userId !: number
    

    
    // @BelongsTo(()=> User)
    // user !: User;

    

    @BelongsToMany(()=> User, {
        through: {
            model: ()=> DocumentUser,
        }
    })
    users!: Array<User>


    //the main defines in index.ts , belongs to, it just declare the name, but if we want we can access with inclde: { model: DocumentUser} 
    @HasMany(()=> DocumentUser,{
        onDelete:'CASCADE',
    })
    sharedDocuments!: Array<DocumentUser>


    @Default(false)
    @Column(DataType.BOOLEAN)
    isPublic !: boolean


}


export { Document};










