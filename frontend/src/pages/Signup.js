import React, { useState } from 'react'
import useSignup from "../hooks/useSignup"
import {motion} from "framer-motion"

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")
    const {signup, error} = useSignup()
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email, password)
        await signup(email, password)
    }
    
  return (
    <motion.form className='signup' 
    onSubmit={handleSubmit}
    initial={{x: "100vw"}}
    animate={{x: 0}}
    exit={{ x: "-100vw"}}
    transition={{delay: 0.5, type: "spring"}}
    >
        <h3>Signup</h3>
        <label>Email: </label>
        <input type="text"
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

export default Signup