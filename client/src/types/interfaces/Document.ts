import { RawDraftContentBlock, RawDraftContentState } from "draft-js";
import DocumentUser from "./DocumentUser";

interface DocumentInterface{
    id:number;
    title: string;
    content: RawDraftContentState | null ;
    createdAt: Date;
    updatedAt: Date ;
    userId: number ;
    sharedDocuments: Array<DocumentUser>;
    isPublic : boolean;
}



export type { DocumentInterface}; 