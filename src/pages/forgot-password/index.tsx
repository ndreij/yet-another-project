import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import styles from '../pages.module.css';
import { Link, Redirect } from 'react-router-dom'
import { forgotPassword, getAuth } from 'services/actions'
import { useSelector, useDispatch } from '../../services/hooks';

export function ForgotPasswordPage() {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const isForgotPasswordEmailSent = useSelector((state) => state.auth.isForgotPasswordEmailSent)
    const [emailValue, setEmailValue] = useState('')
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

    if (isForgotPasswordEmailSent) {
        return (<Redirect to='/reset-password' />)
    }

    if (isLoggedIn) {
        return (<Redirect to='/' />)
    } else {
        return (
            <>
                <div className={styles.content}>
                    <p className={styles.header}> Восстановление пароля</p>
                    <form onSubmit={e => {e.preventDefault(); dispatch(forgotPassword(emailValue)) }}>
                    <div className="pb-6">
                        <Input
                            type={'email'}
                            placeholder={'Укажите E-mail'}
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

                    <div className="text text_type_main-default pb-20">
                       
                        <Button type="primary" size="medium">
                            Восстановить
                        </Button>
                       
                    </div>
                    </form>
                   
                    <p className="text text_type_main-default">Вспомнили пароль? <Link to='/login'>Войти</Link></p>
                </div>
            </>
        )
    }
}