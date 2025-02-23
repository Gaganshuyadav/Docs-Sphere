import { Socket, RemoteSocket} from "socket.io";



declare module "socket.io"{
    interface Socket{
        user?: RequestUser
    }
    interface RemoteSocket{
        user?: RequestUser
    }
}



export {};