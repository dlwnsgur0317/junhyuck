import {AuthContext} from './index'
import {useState} from 'react'

export const AuthProvider = ({children}) => {
    const [session, setSession] = useState(null)

    return (
        <AuthContext.Provider
            value ={{session, setSession}}>
            {children}
        </AuthContext.Provider>
    )
}
