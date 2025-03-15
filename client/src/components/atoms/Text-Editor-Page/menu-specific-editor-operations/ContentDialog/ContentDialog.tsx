import React from 'react'

const ContentDialog = ( { setFunction, component}:{ component: JSX.Element, setFunction: Function}) => {
  return (
    <div onClick={()=>{ setFunction(false)}} className='fixed w-full h-full left-0 top-0 bg-black/50 flex justify-center items-center'>
        <div 
            onClick={(e)=>{e.stopPropagation(); setFunction(true) }}
            className='border-2 p-4 bg-white rounded-md min-w-[10vw] h-min-[20vh] text-black flex flex-col items-center justify-center'>
              { component}
        </div>
    </div>
  )
}

export default ContentDialog