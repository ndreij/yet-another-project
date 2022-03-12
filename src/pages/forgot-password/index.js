import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState, useRef, useEffect } from 'react'
import AppHeader from '../../components/app-header/app-header.js'
import styles from '../pages.module.css';
import { Link, Redirect } from 'react-router-dom'
import { forgotPassword } from 'services/actions/authactions.js'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth } from '../../services/actions/authactions.js'

export function ForgotPasswordPage() {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    const [emailValue, setEmailValue] = useState('')
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
                    <p className={styles.header}> Восстановление пароля</p>

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
                        <Button type="primary" size="medium" onClick={() => dispatch(forgotPassword(emailValue))}>
                            Восстановить
                        </Button>
                    </div>

                    <p className="text text_type_main-default">Вспомнили пароль? <Link to='/login'>Войти</Link></p>
                </div>
            </>
        )
    }
}