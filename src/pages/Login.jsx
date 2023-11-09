import { useNavigate } from "react-router-dom";
import { Auth, Provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Layout from '../layout'


const Login = () => {
  const navigate = useNavigate()
  const signIn = () => {
    signInWithPopup(Auth, Provider)
      .then(() => {
        navigate('/')
      })
      .catch(err => console.log(err))
  }
  return (
    <Layout>
      <div className='login-page'>
        <h1 className="text-5xl mb-5">Login Here!</h1>
        <button
          onClick={signIn}
          className="button"
        >
          Sign in with Google
        </button>
      </div>
    </Layout>
  )
}

export default Login
