import { useState } from "react"
import {useLogin} from '../hooks/useLogin'


const Login = () => {

    const [identifier, setIdentifier] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(identifier, password)
    }

    return (
        <>
        <div className="user-form">
            <div className="Signup-login-border">
                <form className="login" onSubmit={handleSubmit}>
                    <h3> Log In </h3>

                    <label> Username or Email: </label>
                    <input type="text" onChange={(e) => setIdentifier(e.target.value)} value={identifier}/>

                    <label> Password: </label>
                    <input type="password" autoComplete='password' onChange={(e) => setPassword(e.target.value)} value={password}/>

                    <button disabled={isLoading} className="primary-button"> Log In </button>
                    {error && <div className="error"> {error} </div>}
                </form>
            </div>
        </div>
        </>
    )
}

export default Login
