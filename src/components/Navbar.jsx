import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from '../firebase-config';
import { signOut } from 'firebase/auth';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const [user] = useAuthState(Auth)
  const navigator = useNavigate()

  const logOut = () => {
    signOut(Auth)
    navigator('/')
  }
  return (
    <header>
      <h3><Link className='link' to='/'>Image Generator</Link></h3>
      <div className="menu">
        <Link className='link' to="/">Home</Link>
        {
          user && <Link className='link' to='/generate'>Generate</Link>
        }
        {
          user
            ? (
              <div className="link">
                <div className="d-flex">
                  <img className='logo' src={user.photoURL} alt={user.displayName} />
                  <button onClick={logOut}><LogoutIcon /></button>
                </div>
              </div>
            )
            : <Link className='link' to="/login">Login</Link>
        }
      </div>
    </header>
  )
}

export default Navbar
