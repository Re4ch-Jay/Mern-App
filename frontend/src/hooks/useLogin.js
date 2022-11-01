import { useContext, useState } from 'react'
import axios from "axios"
import { AuthContext } from '../context/AuthContext'
import {useNavigate} from "react-router-dom"
function useLogin() {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const {dispatch} = useContext(AuthContext)

    const login = async (email, password) => {
        await axios.post("api/user/login",  {email, password})
            .then(res => {
                if (res.data) {
                    setError(null)
                    // save the user to local storage
                    localStorage.setItem('user', JSON.stringify(res.data))
                    dispatch({type: "LOGIN", payload: res.data})
                    navigate('/')
                }
            })
            .catch(error => {
                setError(error.response.data.error)
            })
    }
  return {login, error}
}

export default useLogin