import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import styles from '../pages.module.css'
import { login } from 'services/actions/authactions.js'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth } from '../../services/actions/authactions.js'

export function LoginPage () {

    const location = useLocation()

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    const [emailValue, setEmailValue] = useState('')
    const [passValue, setPassValue] = useState('')
    const inputRef = useRef(null)

    const dispatch = useDispatch();

    const isAuthLoaded = useSelector(state => state.auth.isAuthLoaded)

    const init = useCallback(() => {
        dispatch(getAuth());
    }, [dispatch]);

    useEffect(() => {
        init();
    }, [init]);

    if (!isAuthLoaded) {
        return null;
    }

    let redirectPath = ''
    if (location.state === undefined) {
        redirectPath = '/';
      } else {
        redirectPath = location.state.from.pathname
      }

if (isLoggedIn) {
    return (<Redirect to={redirectPath} />)
} else {
    return (
        <>
        <div className={styles.content}>
        <p className={styles.header}> Вход</p>

        <form onSubmit={e => {e.preventDefault(); dispatch(login(emailValue, passValue)) }}>
        <div className="pb-6">
        <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={e => setEmailValue(e.target.value)}
            icon={undefined}
            value={emailValue}
            name={'E-mail'}
            error={false}
            innerRef={inputRef}
            errorText={'Ошибка'}
            size={'default'}
        />
        </div>

        <div className="pb-6">
        <PasswordInput
            type={'password'}
            placeholder={'Пароль'}
            onChange={e => setPassValue(e.target.value)}
            icon={'ShowIcon'}
            value={passValue}
            name={'Пароль'}
            error={false}
            innerRef={inputRef}
            errorText={'Ошибка'}
            size={'default'}
        />
        </div>


        <div className="pb-20">
        <Button type="primary" size="medium">
            Войти
        </Button>
        </div>
        </form>

        <p className="text text_type_main-default pb-4">Вы — новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>
        <p className="text text_type_main-default">Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></p>
        </div>
    </>
)
}
}