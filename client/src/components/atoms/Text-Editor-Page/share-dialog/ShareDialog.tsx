import { useEffect, useState } from "react"

export default function ShareDialog({ Button, Component}:{ Button: JSX.Element, Component:JSX.Element}){

    const [ shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);

    return(
        <>
        <div onClick={()=>{ setShareDialogOpen(true)}}>
            {Button}
        </div>
        {
        shareDialogOpen && ( 
           <div 
               onClick={(e)=>{setShareDialogOpen(false);} } 
               className="fixed top-0 left-0 z-10 w-[100vw] h-[100vh] border-20 border-black flex items-center justify-center bg-black/50"
            >
                <div 
                    onClick={(e)=>{
                        e.stopPropagation(); //stop child to parent , or stop event bubbling, and capturing
                        setShareDialogOpen(true);
                        
                    }} 
                    className=" flex flex-col items-center justify-center"
                >
                    
                {Component}

                </div>
            </div> )
        }
        </>
    )
}