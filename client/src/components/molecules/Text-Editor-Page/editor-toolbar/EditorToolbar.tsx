import { East, West, FormatBold, FormatItalic, FormatUnderlined, FormatClear, FormatColorReset, FormatColorText, DriveFileRenameOutline} from "@mui/icons-material";

export default function EditorToolbar(){

    return( 
        <div className="flex bg-blue-50 rounded-full">
          <div className=" w-28 flex">
            <div className=" w-3/6 flex items-center justify-end border-r-2">
                <West sx={{ fontSize:"22px", color:"gray" , "&:hover":{color:"black"}, marginRight:"5px"}}/>
            </div>
            <div className=" w-3/6 flex items-center justify-start"> 
                <East sx={{ fontSize:"22px", color:"gray" , "&:hover":{color:"black"}, marginLeft:"5px"}} />
            </div>
          </div>
          <div className=" h-10 w-full flex justify-start"  >
              <IconBox icon={<FormatBold sx={{fontSize:"22px", color:"rgba(0, 0, 0, 0.76)",margin:"3px" }}/>} />
              <IconBox icon={<FormatItalic sx={{fontSize:"22px", color:"rgba(0, 0, 0, 0.76)",margin:"3px" }}/>} />
              <IconBox icon={<FormatUnderlined sx={{fontSize:"22px", color:"rgba(0, 0, 0, 0.76)",margin:"3px" }}/>} />
              <IconBox icon={<FormatClear sx={{fontSize:"22px", color:"rgba(0, 0, 0, 0.76)",margin:"3px" }}/>} />
              <IconBox icon={<FormatColorReset sx={{fontSize:"22px", color:"rgba(0, 0, 0, 0.76)",margin:"3px" }}/>} />
              <IconBox icon={<FormatColorText sx={{fontSize:"22px", color:"rgba(0, 0, 0, 0.76)",margin:"3px" }}/>} />
              <IconBox icon={<DriveFileRenameOutline sx={{fontSize:"22px", color:"rgba(0, 0, 0, 0.76)",margin:"3px" }}/>} />
              
          </div>
        </div>
    )
}

const IconBox = ( { icon}:{ icon:JSX.Element})=>{

    return(
        <div  className="w-10 h-10 flex justify-center items-center">
            <div className="rounded hover:bg-blue-300">{icon}</div>
        </div>
    )
}