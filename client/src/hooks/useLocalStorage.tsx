import { useState } from "react"


const useLocalStorage = <T,>( key:string ,initialValue:T ):[ string, Function] =>{

    const [ storedValue, setStoredValue] = useState( ()=>{

            
        //if storage limit exceed or invalid json data
            try{
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : initialValue;
            }
            catch(err){
                return initialValue;
            }
        });

        const setValue = ( value:T)=>{
            try{
                localStorage.setItem( key, JSON.stringify(value));
                setStoredValue(value);
            }
            catch(err){}

        }

        return [ storedValue, setValue];

}


export default useLocalStorage;







