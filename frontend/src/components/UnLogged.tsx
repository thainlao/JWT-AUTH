import React, { FC, useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hoocs'
import { login, logout, registration } from '../store/reducer/AuthReducer'

const OnLoged: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const {user, isAuth, isLoading} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const handleLogin: React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(login({ email, password }))
    }

    const handleRegistration: React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(registration({ email, password }))
    }

    const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(logout());
    };

    return (
        <div>
            <div>
            <label>Email:</label>
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div>
            <label>Password:</label>
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            {isLoading ? (
            <p>Loading...</p>
            ) : isAuth ? (
            <div>
                <h1>{isAuth ? `Пользователь авторизован ${email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            ) : (
            <div>
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleRegistration}>Register</button>
            </div>
            )}
      </div>
    )
}

export default OnLoged;