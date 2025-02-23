import ShareDialog from "../../../atoms/Text-Editor-Page/share-dialog/ShareDialog";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LockIcon from '@mui/icons-material/Lock';
import LinkShareIcon from "/images/link.png";
import "../../../../App.css";
import { useRandomColor } from "../../../../hooks/useRandomColor";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DocumentStateType } from "../../../../vite-env";
import { savingDocument, setDocument } from "../../../../redux/Slices/documentSlice";
import { ChangeEvent, KeyboardEvent, useContext, useState } from "react";
import { ToastContext } from "../../../../context/toast-context";
import axios from "axios";
import { server } from "../../../../utils/config";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import { AppDispatch } from "../../../../redux/store";
import { useParams } from "react-router";
import SharedUsers from "../../../atoms/Text-Editor-Page/share-users/SharedUsers";
import { PermissionEnum } from "../../../../types/enums/PermissionEnum";
import DocumentUser from "../../../../types/interfaces/DocumentUser";

const ShareDocumentModel = () =>{


  const { document} = useSelector( ( state:{ document: DocumentStateType })=>state.document);
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [ accessToken] = useLocalStorage("docs-sphere-refresh-token","");
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const { error, success} = useContext(ToastContext);
  const [ searchEmail, setSearchEmail] = useState("")

    const [ randomColor] = useRandomColor();


  
    const handleCopyLink = ()=>{

      if(params.id===null || params.id===undefined){
        return;
      }
        
        window.navigator.clipboard.writeText( window.location.href)
        .then(()=>{
          success("Link Copied !!");
        })
    };

    //update is public or private
    const updateIsPublic = async ( isPublic:boolean) =>{

      if(accessToken===null ){
        return;
      }
      
      dispatch( savingDocument(true));

      try{
          await axios.put(`${server}/document/${document?.id}`, { isPublic}, { headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${accessToken}` } });
          dispatch( setDocument( { ...document, isPublic}));
      }
      catch(err:any ){
          error("error in saving the document, Please try again.");
      }
      finally{
          dispatch( savingDocument(false));
      }

    }
 
    const changeToPublicBtn = (
      <>
       <div>
         <button disabled={isLoading} onClick={()=>{ updateIsPublic(true)}}>
           <Box className="text-blue-600 font-semibold hover:text-blue-700" sx={{"&:hover":{textShadow:"0px 0px 1px blue"}}}>Change to anyone with the link</Box>
         </button>
         <div className=" flex mt-2">
           <b className="text-gray-700 font-bold">Restricted</b>
           <p className="text-gray-600 font-semibold ml-1">Only added people can connect with the link</p>
         </div>
       </div>
      </>
    );


    const changeToRestrictedBtn = (
      <>
       <div>
         <button disabled={isLoading} onClick={()=>{ updateIsPublic(false)}}>
           <Box className="text-blue-600 font-semibold hover:text-blue-700" sx={{"&:hover":{textShadow:"0px 0px 1px blue"}}}>Change to only shared Users with the Link</Box>
         </button>
         <div className=" flex mt-2">
           <b className="text-gray-700 font-bold">Public</b>
           <p className="text-gray-600 font-semibold ml-1">Anyone can connect with the link</p>
         </div>
       </div>
      </>
    );

    const shareDocument = async ( shareEmail:string) =>{

      if(""===searchEmail.trim()){
        return;
      }

      setIsLoading(true);
      try{
         const { data} = await axios.post<{documentUser:DocumentUser, user:{email:string}}>(`${server}/document/${document?.id}/share`, { email: shareEmail, permission: PermissionEnum.VIEW }, { headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${accessToken}` } });
         dispatch( setDocument({ ...document, sharedDocuments: [ ...document?.sharedDocuments,  { ... data?.documentUser, User:{ email: data.user.email} } ] }));
         success(`Document is Shared with ${data.user.email}, Successfully !!`)
      }
      catch(err:any){
          if(err.status===409){
              error("Document is Shared Already");
              return;
          }

          error(`Unable to share document with ${searchEmail}, Please try again `);
          
      }
      finally{
          setIsLoading(false);
          setSearchEmail("");
      }

  };

  const handleKeyPressDownEvent = (e:KeyboardEvent<HTMLDivElement>) =>{
       
      if(e.code==="Enter"){
          shareDocument(searchEmail);
      }
  }

    return(
        <ShareDialog 
            Button={<div>
                      <button className="flex py-2 px-4 rounded-lg bg-blue-700 hover:bg-blue-800">
                        <div className="text-white">
                          <LockIcon sx={{fontSize:"20px", position:"relative", bottom:"2px"}}/>
                        </div> 
                        <div
                            className="ml-1 text-white font-medium tracking-wide text-md"
                        >
                          Share
                        </div>
                      </button>
                    </div>
                    } 
            Component={
                    <>
                    <div 
                        onKeyDown={handleKeyPressDownEvent}
                        className="border-none p-4 w-full bg-white flex flex-col rounded-md text-black opacity-100 sm:w-[500px] md:w-[600px]"
                    >
                        <div>
                            
                            <div className="flex">
                                <div className="rounded bg-blue-600 rounded-full">
                                    <GroupAddIcon style={{fontSize:"25px", margin:"7px", color:"white"}}/>
                                </div>
                                <h1 className="ml-2 font-semibold text-gray-500 my-auto text-xl">Share with people</h1>
                            </div>

                            <div className=" my-4 font-semibold  ">
                                <input 
                                    type="text" 
                                    placeholder="Enter Email"
                                    spellCheck={false}
                                    value={searchEmail}
                                    onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setSearchEmail(e.target.value)}}
                                    className=" border-b-2 border-blue-400 w-full p-3 outline-none text-gray-700 font-semibold tracking-wide caret-blue-700 bg-gray-100 rounded-t-sm"
                                />
                            </div>

                            { document && (<SharedUsers document={document} />) }
    
                            <div className=" w-full flex flex-col">
                                <button
                                    onClick={()=>{shareDocument(searchEmail)}}
                                    disabled={isLoading}
                                    className="self-end border-2 px-5 py-[5px] rounded-md text-md tracking-wider font-semibold text-white bg-blue-500 border-none hover:bg-blue-700"
                                >
                                  Share
                            </button>
                            </div>
                             
                        </div>
                    </div>


                    <div className="p-4 w-full bg-white flex flex-col rounded-md mt-6 text-red-800">
                            
                            <div className=" flex">
                                <div className=" w-[45px] h-[45px] flex justify-center items-center rounded-full bg-gray-300">
                                  <img src={LinkShareIcon} style={{width:"34px" , borderRadius:"50%"}} className="bg-gray-300"/>
                                </div> 
                                <h1 className="text-black font-semibold text-2xl my-auto ml-2">Get Link</h1>
                            </div>


                            <div className=" mt-8 flex justify-between">
                              
                              { document?.isPublic ? changeToRestrictedBtn : changeToPublicBtn}

                              <div onClick={handleCopyLink} className=" my-auto font-semibold text-blue-700 mr-2 hover:text-blue-400">
                                <button>Copy Link</button>
                              </div>

                            </div>
                    </div>
                    </>
                    }
        />
    )
}

export { ShareDocumentModel};