/// <reference types="vite/client" />

import { DocumentInterface } from "./types/interfaces/Document";
import { UserType } from "./types/interfaces/UserType";


interface UserStateType{
    isUserLoading: boolean;
    isAuthenticated: boolean 
    user: UserType | null ;
    accessToken: string;
    refreshToken: string;
    errors: Array<string>;
}


interface DocumentStateType{
    isDocumentLoading: boolean;
    document: DocumentInterface | null;
    errors: Array<string>;
    saving: boolean;
    currentUsers: Array<string> | null;
    
}

