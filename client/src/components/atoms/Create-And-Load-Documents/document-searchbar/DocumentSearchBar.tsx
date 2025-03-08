import { ChangeEvent, useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import axios from "axios";
import { Link } from "react-router";
import { server } from "../../../../utils/config";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import { DocumentInterface } from "../../../../types/interfaces/Document";

export default function DocumentSearchBar() {

    const [isFocused, setIsFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [ accessToken] = useLocalStorage("docs-sphere-refresh-token","");
    const [ allResponseDocs, setAllResponseDocs] = useState<Array<DocumentInterface>>([]);

    const searchQueryApi = async ( searchQuery:string)=>{

        try{
            const { data} = await axios.post<{ allDocs: Array<DocumentInterface>}>(`${server}/document/search`, { search: searchQuery}, {headers:{ "Content-type":"application/json", "Authorization":`Bearer ${accessToken}`}});
            setAllResponseDocs(data.allDocs);
        }
        catch(err){
            setAllResponseDocs([]);
        }
    }


    //when query is changing
    useEffect(()=>{

        setAllResponseDocs([]);

        const searchTimeout = setTimeout(()=>{

            
            if(searchQuery.length < 1){
                return;
            }

            searchQueryApi(searchQuery);

        },1000);
        
        return ()=>{
            clearTimeout(searchTimeout);
        }

    },[searchQuery]);


    //when isFocused change , clear data
    useEffect(()=>{

        setAllResponseDocs([]);
    },[isFocused]);





    return (
        <div className={` left-3 md:left-0 w-8/12 sm:w-9/12 md:h-12 md:w-8/12 lg:w-6/12 border-blue-500 relative`}>

            {/* search */}
            <div className={`h-12 w-full flex items-center shadow-md bg-gray-100 relative rounded ${isFocused ? "ring-2 ring-blue-500" : "border-2"}`}>
                <div className="p-1 w-[40px] ">
                    <Search sx={{ fontSize: "28px", color: "gray" }} />
                </div>
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full p-1 text-md outline-none bg-gray-100"
                        onFocus={() => { setIsFocused(true) }}
                        onBlur={() => { setIsFocused(false) }}
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>{ setSearchQuery( e.target.value)}}
                    />
                </div>
            </div>

            {/* suggestions */}

            {  isFocused && searchQuery.length > 0  && (
              <div className="rounded-lg border-[1px] border-gray-200 bg-white drop-shadow-2xl relative mt-2 py-4 px-1">
                  {
                    allResponseDocs.map((docs)=>{
                        return <SerachQueryOption document={docs} />
                    })
                  }
              </div>) 
            } 

        </div>
    )
}


const SerachQueryOption = ( { document}:{ document:DocumentInterface}) => {
    
    return (
        <Link to={`/document/${document.id}`}>
        <div className="rounded border-[2px] flex items-start py-1 my-1 hover:bg-gray-200">
            <InsertDriveFileIcon sx={{ color: "rgba(10, 11, 39, 0.48)", fontSize: "27px", margin: "7px 14px" }} />
            <div className=" flex flex-col ml-2">
                <div className="text-gray-600 font-bold tracking-wider text-lg">{document.title}</div>
                <div className=" text-gray-500 font-semibold text-xs">{new Date( document?.updatedAt).toLocaleDateString("en-US",{ month: "short", day:"numeric", year:"numeric"})}</div>
            </div>
        </div>
        </Link>
    )
}