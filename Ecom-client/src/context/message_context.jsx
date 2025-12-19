import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"


export const MessageContaxt = createContext()

export const MessageProvider =(props)=>{
    const [message,setMessage]=useState(null) 
    const [messageDisplay,setMessageDisplay]=useState(false) 
    const [isSuccess,setIsSuccess]=useState(false) 
    const [logoutOpen,setLogoutOpen]=useState(false)
    
const messagedata={
   logoutOpen,
   setLogoutOpen,
   setIsSuccess,
   setMessage,
   setMessageDisplay,
   message,
   messageDisplay,
   isSuccess
}
    return <>

    <MessageContaxt.Provider value={messagedata} >
        {props.children}
    </MessageContaxt.Provider>
    </>
}


