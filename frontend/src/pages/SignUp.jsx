import { useState } from "react"
import {useSignup} from '../hooks/useSignup'


const SignUp = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading} = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
    
        await signup(username, email, password) 
    }

  return (
    <>

      <form className='signup' onSubmit={handleSubmit}>
        <h3> Sign Up </h3>

        <label> Username: </label>
        <input type='username'onChange={(e) => setUsername(e.target.value)} value={username}/>

        <label> Email: </label>
        <input type='email'onChange={(e) => setEmail(e.target.value)} value={email}/>

        <label> Password: </label>
        <input type='password' autoComplete='password' onChange={(e) => setPassword(e.target.value)} value={password}/>

        <button disabled={isLoading} className="primary-button"> Sign Up </button>
        {error && <div className='error'> {error} </div>}

    </form>

    </>
  )
}

export default SignUp
