import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState, useRef, useEffect } from 'react'
import AppHeader from '../../components/app-header/app-header.js'
import { Link, Redirect } from 'react-router-dom'
import styles from '../pages.module.css';
import { register } from '../../services/actions/authactions.js'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth } from '../../services/actions/authactions.js'

export function RegisterPage () {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    const [nameValue, setNameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passValue, setPassValue] = useState('')

    const inputRef = useRef(null)

    const dispatch = useDispatch();

    const isAuthLoaded = useSelector(state => state.auth.isAuthLoaded)

    const init = () => {
        dispatch(getAuth());
    };

    useEffect(() => {
        init();
    }, []);

    if (!isAuthLoaded) {
        return null;
    }
    
    if (isLoggedIn) {
        return (<Redirect to='/' />)
    } else {
    return (
        <>
            <AppHeader />
            <div className={styles.content}>
                <p className={styles.header}>Регистрация</p>

            <div className="pb-6">
            <Input 
                type={'text'}
                placeholder={'Имя'}
                onChange={e => setNameValue(e.target.value)}
                icon={undefined}
                value={nameValue}
                name={'Имя'}
                error={false}
                innerRef={inputRef}
                errorText={'Ошибка'}
                size={'default'}
            />
            </div>

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

            <div className="pb-20">
            <PasswordInput
                type={'password'}
                placeholder={'Пароль'}
                onChange={e => setPassValue(e.target.value)}
                value={passValue}
                name={'Пароль'}
                error={false}
                innerRef={inputRef}
                errorText={'Ошибка'}
                size={'default'}
            />
            </div>

            <div className="text text_type_main-default pb-6">
            <Button type="primary" size="medium" onClick={() => dispatch(register(nameValue, emailValue, passValue))}>
                Зарегистрироваться
            </Button>
            </div>

            <p className="text text_type_main-default">Уже зарегистрированы? <Link to='/login'>Войти</Link></p>
        </div>
        </>
    )
    }
}