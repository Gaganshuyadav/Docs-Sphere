
interface UserType{
    id:number;
    email:string;
    roles: Array<string>;
    exp: number;
}

export type { UserType};