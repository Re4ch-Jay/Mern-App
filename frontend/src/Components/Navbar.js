import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import useLogout from '../hooks/useLogout'


function Navbar() {
  const {logout} = useLogout()
  const {user} = useContext(AuthContext)
  return (
    <header >
        <div className='container'>
            <Link to="/">
                <h1>Workout Jazz</h1>
            </Link>
            <nav>
             {user && 
              <div>
                <span>{user.email}</span>
                <button onClick={logout}>
                  Logout
                </button>
              </div>}
              {!user && 
              <div>
                <Link to="/login">
                  Login
                </Link>
                <Link to="/signup">
                  Signup
                </Link>
              </div>}
             
            </nav>
        </div>
    </header>
  )
}

export default Navbar