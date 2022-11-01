import React, { createContext, useEffect, useReducer } from 'react'
export const AuthContext = createContext()

const reducer = (state, action) => {
    switch(action.type){
        case "LOGIN":
            return {
                user: action.payload
            }
        case "LOGOUT":
            return {
                user: null
            }
        default:
            return state;
    }
}

function AuthContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, {user: null});
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if(user) dispatch({type: "LOGIN", payload: user})
    }, [user])

    console.log("Auth Context: ", state)

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider