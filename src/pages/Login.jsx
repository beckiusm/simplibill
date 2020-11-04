import React, { useState, useEffect, useContext } from 'react';
import User from "../data/User";
import {StorageContext} from "../contexts/StorageContext";

const Login = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {setIsAuthenticated} = useContext(StorageContext);

    async function loginUser(event) {
        event.preventDefault();
        const response = await User.getToken(email, password);
        if(response.status !== 200) {
            return;
        }
        const data = await response.json();
        User.saveToken(data.token);
        setIsAuthenticated(true);
        history.push('/home');
    }

    useEffect(() => {
        if(User.loadToken()) {
            setIsAuthenticated(true);
            history.push('/home');
        }
    }, [])

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
