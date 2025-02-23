import { useEffect } from "react";
import logoImage from "/images/google-docs.png";

export default function Logo({ width=40, marginLeft=0}:{ width:number, marginLeft:number}){


    return(
        <div style={{width:`${width}px`}}>
            <img src={logoImage} className={`ml-${marginLeft}`}/>
        </div>
    )
} 