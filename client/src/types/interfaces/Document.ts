import DocumentUser from "./DocumentUser";

interface DocumentInterface{
    id:number;
    title: string;
    content: string | null ;
    createdAt: Date;
    updatedAt: Date ;
    userId: number ;
    sharedDocuments: Array<DocumentUser>;
    isPublic : boolean;
}



export type { DocumentInterface}; 