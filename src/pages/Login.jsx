import React, {useContext, useState, useEffect} from 'react';
import {TokenContext} from "../contexts/TokenContext";
import User from "../data/User";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {token, setToken} = useContext(TokenContext);

    async function loginUser(event) {
        event.preventDefault();
        const response = await User.getToken(email, password);
        const data = await response.json();
        setToken(data.token);
    }

    useEffect(() => {
        console.log(token);
    },[token])

    return (
        <div className='row justify-content-md-center'>
            <div className='col-md-4'>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                               placeholder="Enter email"
                               onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={loginUser}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
