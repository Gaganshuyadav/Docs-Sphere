import { PermissionEnum } from "../enums/PermissionEnum";


interface DocumentUser{
    permission: PermissionEnum;
    userId: number;
    documentId: number;
    createdAt: Date;
    updatedAt: Date;
    User: {
        email: string;
    }

}

export default DocumentUser;
