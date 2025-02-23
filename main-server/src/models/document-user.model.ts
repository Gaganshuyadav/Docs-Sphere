import  { BelongsTo, Column, DataType, ForeignKey, PrimaryKey, Table, Model} from "sequelize-typescript";
import PermissionEnum from "../utils/types/enum/permission-enum.js";
import { User} from "./user.model.js";
import { Document} from "./document.model.js";

@Table({ tableName:"document_user", underscored: true})

class DocumentUser extends Model{

    @Column({ 
        type: DataType.ENUM(...Object.values( PermissionEnum)),                   //it takes enum as multiple strings
    })
    permission!: PermissionEnum;

    // @BelongsTo(()=> User)
    // user !: User


    @ForeignKey(()=> User)
    @PrimaryKey
    @Column
    userId!: number;

    //used only for name declaration
    @BelongsTo(()=> Document)
    document !: Document

    @ForeignKey(()=> Document)
    @PrimaryKey
    @Column
    documentId !: number

    
    



}

export  { DocumentUser};













