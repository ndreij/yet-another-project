import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link, Redirect } from 'react-router-dom'
import styles from '../pages.module.css';
import { register } from '../../services/actions'
import { useSelector, useDispatch } from '../../services/hooks';
import { getAuth } from '../../services/actions'

export function RegisterPage () {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    const [nameValue, setNameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passValue, setPassValue] = useState('')

    const inputRef = useRef(null)

    const dispatch = useDispatch();

    const isAuthLoaded = useSelector((state) => state.auth.isAuthLoaded)

    const init = useCallback(() => {
        dispatch(getAuth());
    }, [dispatch]);

    useEffect(() => {
        init();
    }, [init]);

    if (!isAuthLoaded) {
        return null;
    }
    
    if (isLoggedIn) {
        return (<Redirect to='/' />)
    } else {
    return (
        <>
            <div className={styles.content}>
                <p className={styles.header}>Регистрация</p>

                <form onSubmit={e => {e.preventDefault(); dispatch(register(nameValue, emailValue, passValue)) }}>
            <div className="pb-6">
            <Input 
                type={'text'}
                placeholder={'Имя'}
                onChange={e => setNameValue(e.target.value)}
                icon={undefined}
                value={nameValue}
                name={'Имя'}
                error={false}
                ref={inputRef}
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
                ref={inputRef}
                errorText={'Ошибка'}
                size={'default'}
            />
            </div>

            <div className="pb-20">
            <PasswordInput
                onChange={e => setPassValue(e.target.value)}
                value={passValue}
                name={'Пароль'}
                size={'default'}
            />
            </div>

            <div className="text text_type_main-default pb-6">
            <Button type="primary" size="medium">
                Зарегистрироваться
            </Button>
            </div>
            </form>

            <p className="text text_type_main-default">Уже зарегистрированы? <Link to='/login'>Войти</Link></p>
        </div>
        </>
    )
    }
}