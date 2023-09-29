import React, { FC, useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hoocs'
import { login, logout, registration } from '../store/reducer/AuthReducer'
import OnLoged from './UnLogged'





const LoginForm: FC = () => {
    const {user, isAuth} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(logout());
    };

    if(!isAuth) {
      return (
        <OnLoged />
      )
    }
    


    return (
    <div>
      <h1>Добро пожаловать,{user.email}</h1>
      <button onClick={handleLogout}>выйти</button>
      <div>
        <h2>Some Post</h2>
        <p>Post content goes here...</p>
      </div>
    </div>
    )
}

export default LoginForm;