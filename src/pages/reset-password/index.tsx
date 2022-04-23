import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import styles from '../pages.module.css'
import { Link, Redirect } from 'react-router-dom'
import { resetPassword, getCookie, getAuth } from 'services/actions'
import { useSelector, useDispatch } from '../../services/hooks';

export function ResetPasswordPage() {

    const isEmailSent = getCookie('emailSent')

    const isPasswordReset = useSelector((state) => state.auth.isPasswordReset)

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    const [passValue, setPassValue] = useState('')
    const [tokenValue, setTokenValue] = useState('')
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
   
    if (isLoggedIn || !isEmailSent) {
        return (<Redirect to='/' />)
    } else {
        return (
            <>
                <div className={styles.content}>
                    <p className={styles.header}> Восстановление пароля</p>

                    <form onSubmit={e => {e.preventDefault(); dispatch(resetPassword(passValue, tokenValue)) }}>
                    <div className="pb-6">
                        <Input
                            type={'password'}
                            placeholder={'Введите новый пароль'}
                            onChange={e => setPassValue(e.target.value)}
                            icon={'ShowIcon'}
                            value={passValue}
                            name={''}
                            error={false}
                            ref={inputRef}
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
                            ref={inputRef}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                    </div>

                    <div className="pb-20">
                        <Button type="primary" size="medium">
                            Восстановить
                        </Button>
                    </div>
                    </form>
                    {isPasswordReset ? 
                    <p className="text text_type_main-default pb-4">Пароль обновлен <Link to='/login'>Войти</Link></p> 
                    : 
                    <p className="text text_type_main-default pb-4">Вспомнили пароль? <Link to='/login'>Войти</Link></p>
                    }
                    
                </div>
            </>
        )
    }
}