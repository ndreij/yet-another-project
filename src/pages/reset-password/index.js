import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState, useRef, useEffect } from 'react'
import AppHeader from '../../components/app-header/app-header.js'
import styles from '../pages.module.css'
import { Link, Redirect } from 'react-router-dom'
import { resetPassword, getCookie } from 'services/actions/authactions.js'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth } from '../../services/actions/authactions.js'

export function ResetPasswordPage() {

    const isEmailSent = getCookie('emailSent')

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    const [passValue, setPassValue] = useState('')
    const [tokenValue, setTokenValue] = useState('')
    const inputRef = useRef(null)
    const dispatch = useDispatch();
    const isAuthLoaded = useSelector(state => state.auth.isAuthLoaded)

    const init = () => {
        dispatch(getAuth());
    };

    useEffect(() => {
        init();
    }, []);

    console.log(!isEmailSent)
    
    if (!isAuthLoaded) {
        return null;
    }
   
    if (isLoggedIn || !isEmailSent) {
        return (<Redirect to='/' />)
    } else {
        return (
            <>
                <AppHeader />
                <div className={styles.content}>
                    <p className={styles.header}> Восстановление пароля</p>

                    <div className="pb-6">
                        <Input
                            type={'password'}
                            placeholder={'Введите новый пароль'}
                            onChange={e => setPassValue(e.target.value)}
                            icon={'ShowIcon'}
                            value={passValue}
                            name={''}
                            error={false}
                            innerRef={inputRef}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                    </div>

                    <div className="pb-6">
                        <Input
                            type={'text'}
                            placeholder={'Введите код из письма'}
                            onChange={e => setTokenValue(e.target.value)}
                            icon={undefined}
                            value={tokenValue}
                            name={''}
                            error={false}
                            innerRef={inputRef}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                    </div>

                    <div className="pb-20">
                        <Button type="primary" size="medium" onClick={() => dispatch(resetPassword(passValue, tokenValue))}>
                            Восстановить
                        </Button>
                    </div>

                    <p className="text text_type_main-default pb-4">Вспомнили пароль? <Link to='/login'>Войти</Link></p>
                </div>
            </>
        )
    }
}