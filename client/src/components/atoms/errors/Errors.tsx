
interface ErrorsProps{
    errors: Array<string>
}

export default function Errors({ errors}:ErrorsProps){

    return(
        <div>
            {
                errors.map((error,i)=>{
                    return(
                        <div key={i} className="text-red-500 ml-2 text-[14px]">
                            {error}
                        </div>
                    )
                })
            }
        </div>
    )
}
