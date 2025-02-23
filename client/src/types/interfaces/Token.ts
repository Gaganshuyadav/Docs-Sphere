interface Token{
    authResponse:{
        accessToken: string;
        refreshToken: string;
    },
    success: boolean;
}


export type { Token};