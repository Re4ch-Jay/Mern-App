import React, { useState } from 'react'
import useLogin from "../hooks/useLogin"
import {motion} from "framer-motion"

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")
    const {login, error} = useLogin()
    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

  return (
    <motion.form className='login' 
    onSubmit={handleSubmit}
    initial={{x: "100vw"}}
    animate={{x: 0}}
    exit={{ x: "-100vw"}}
    transition={{delay: 0.5, type: "spring"}}
    >
        <h3>Login</h3>
        <label>Email: </label>
        <input type="email"
        onChange={(e) => setEmail(e.target.value)} 
        value={email}
        />
        <label>Password: </label>
        <input type="password" 
        onChange={e => setPassword(e.target.value)}
        value={password}
        />
        <button type='submit'>Submit</button>
        {error && <div className='error'>{error}</div>}
    </motion.form>
  )
}

export default Login