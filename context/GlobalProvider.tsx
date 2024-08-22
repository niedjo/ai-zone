import { fr } from '@/constants/lang';
import { getCurrentUser } from '@/lib/appwrite';
import { Translations } from '@/types';
import React, { createContext, useContext, useState, useEffect} from 'react'

const GlobalContext = createContext({});

export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({ children } : { children : React.ReactNode }) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<Document | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    // le usestate de la langue

    const [text, setText] = useState<Translations>(fr)
    
    useEffect(() => {
        getCurrentUser()
        .then((result) => {
            if(result) { 
                setIsLoggedIn(true)
                setUser(result as any)
            }
            else { 
                setIsLoggedIn(false)
                setUser(null)  
            }
        }).catch((err) => {
          console.log(err);  
        }).finally(() => {
            setIsLoading(false)
        });
    }, [])
   
    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
                text, 
                setText
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
