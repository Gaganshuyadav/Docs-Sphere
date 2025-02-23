// import { createContext, MutableRefObject, useContext, useEffect, useMemo, useRef} from "react";
// import { server } from "../utils/config";
// import { useSelector } from "react-redux";
// import { DocumentStateType, UserStateType } from "../vite-env";
// import useLocalStorage from "../hooks/useLocalStorage";
// import { io, Socket } from "socket.io-client";

// interface SocketContextInterface{
//     socket: MutableRefObject<Socket| null>;
// }

// const defaultValue:SocketContextInterface = {
//     socket: { current: null} as MutableRefObject<Socket | null>
// }



// export const SocketContext = createContext<SocketContextInterface>(defaultValue);

// export const SocketProvider = ( { children}:{ children: JSX.Element}) =>{

//     const { document} = useSelector(( state:{ document:DocumentStateType})=>state.document);
//     //(if the token changes in local storage, your component won't know about it unless you force a re-render.)localstorage function not good, cause socket function will not take updated token ,  our token will not be updated , so we use reduxtoolkit , when changes , our updated token is use
//     const {accessToken}  = useSelector((state:{ user:UserStateType})=>state.user);
 
//     let currentSocket = useRef<Socket|null>(null);

//     useEffect(()=>{

//         if(document===null || accessToken===null || currentSocket===null ){
//             return;
//         }

//         currentSocket.current = io(server,{
//             query: { documentId: document?.id, accessToken},
//         });
    
//         return ()=>{
//             currentSocket?.current?.disconnect();
//         } 

//     },[ document, accessToken, currentSocket.current]);


//     return(
//         <SocketContext.Provider value={{socket: currentSocket}}> 
//             { children}
//         </SocketContext.Provider>
//     )
// }









import { createContext, MutableRefObject, useContext, useEffect, useMemo, useRef} from "react";
import { server } from "../utils/config";
import { useSelector } from "react-redux";
import { DocumentStateType, UserStateType } from "../vite-env";
import useLocalStorage from "../hooks/useLocalStorage";
import { io, Socket } from "socket.io-client";

interface SocketContextInterface{
    socket: Socket| undefined | null;
}

const defaultValue:SocketContextInterface = {
    socket: null
}



export const SocketContext = createContext<SocketContextInterface>(defaultValue);

export const SocketProvider = ( { children}:{ children: JSX.Element}) =>{

    const { document} = useSelector(( state:{ document:DocumentStateType})=>state.document);
    //(if the token changes in local storage, your component won't know about it unless you force a re-render.)localstorage function not good, cause socket function will not take updated token ,  our token will not be updated , so we use reduxtoolkit , when changes , our updated token is use
    const {accessToken}  = useSelector((state:{ user:UserStateType})=>state.user);

    
    
    let socket = (document!==null && accessToken!==null) ?  io(server,  { query: { documentId: document?.id, accessToken}, }) : null;
    


    return(
        <SocketContext.Provider value={{socket}}> 
            { children}
        </SocketContext.Provider>
    )
}



