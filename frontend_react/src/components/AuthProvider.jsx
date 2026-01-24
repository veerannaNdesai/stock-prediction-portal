import { useState,createContext } from "react"

const AuthContext = createContext();

const AuthProvider = ({children}) => {

   const [isLoggedIn,setLoggedin] = useState(
    !! localStorage.getItem('accesToken')
   );

  return (
    <AuthContext.Provider value={{isLoggedIn,setLoggedin}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export {AuthContext};