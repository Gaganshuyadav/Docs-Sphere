declare global{
    
    interface ResponseMessage {
        msg: string;
    }

    interface RequestUser {
        id: string,
        email: string,
        roles: Array<string>
    }

    interface TokenPair {
        accessToken : string,
        refreshToken : string
    }
}


// This line is necessary to make the file a module
export {};
