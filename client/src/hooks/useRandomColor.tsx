import { useEffect, useState } from "react";

const useRandomColor = ():[ string | undefined, Array<string>] =>{

    const colors = [ 
        "bg-[rgb(34,12,56)]", "bg-[rgb(123,45,67)]", "bg-[rgb(200,100,50)]", "bg-[rgb(12,34,56)]",
        "bg-[rgb(78,90,123)]", "bg-[rgb(255,0,0)]", "bg-[rgb(0, 147, 0)]", "bg-[rgb(0,0,255)]",
        "bg-[rgb(0, 108, 9)]", "bg-[rgb(75,0,130)]", "bg-[rgb(238,130,238)]", "bg-[rgb(255,20,147)]","bg-[rgb(169, 32, 100)]","bg-[rgb(14, 88, 88)]","bg-[rgb(163, 92, 5)]","bg-[rgb(128,0,128)]","bg-[rgb(0,128,128)]","bg-[rgb(97, 97, 15)]","bg-[rgb(255,0,255)]","bg-[rgb(0,0,139)]",
        "bg-[rgb(4, 116, 116)]", "bg-[rgb(139,0,139)]","bg-[rgb(255,69,0)]", "bg-[rgb(105, 63, 12)]", "bg-[rgb(201, 13, 13)]",  "bg-[rgb(155, 62, 26)]","bg-[rgb(142, 99, 24)]","bg-[rgb(16, 110, 129)]","bg-[rgb(144, 28, 28)]","bg-[rgb(81, 161, 232)]","bg-[rgb(22, 112, 112)]","bg-[rgb(119, 90, 43)]","bg-[rgb(215, 6, 205)]",
        "bg-[rgb(205, 99, 6)]", "bg-[rgb(132, 0, 44)]", "bg-[rgb(132, 120, 9)]", "bg-[rgb(111, 0, 90)]", "bg-[rgb(0, 68, 0)]", "bg-[rgb(153, 29, 71)]", "bg-[rgb(36, 91, 91)]", "bg-[rgb(130, 24, 24)]"
    ]
    
    const [ randomColor, setRandomColor] = useState<string>();
    

    useEffect(()=>{  

        setRandomColor(colors[ Math.ceil((Math.random()*colors.length)) ]);
    },[]);

    return [ randomColor, colors];
}

export { useRandomColor};