import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState, useRef, useEffect } from 'react'
import AppHeader from '../../components/app-header/app-header.js'
import styles from '../pages.module.css'
import { Link, NavLink } from 'react-router-dom'
import { getUserData, setUserData, logout } from '../../services/actions/authactions.js'
import { useDispatch, useSelector } from 'react-redux'

export function ProfilePage() {

    const [nameValue, setNameValue] = useState(' ')
    const [emailValue, setEmailValue] = useState(' ')
    const [passValue, setPassValue] = useState('')

    const inputRef = useRef(null)

    const dispatch = useDispatch();

    const newName = useSelector(state => state.auth.userName)
    const newEmail = useSelector(state => state.auth.userEmail)

    function resetCredentials() {
        setNameValue(newName)
        setEmailValue(newEmail)
    }

    useEffect(() => {
        dispatch(getUserData())
    }, [dispatch])

    useEffect(() => {
        setNameValue(newName)
        setEmailValue(newEmail)
    }, [newName, newEmail])


    return (
        <>
            <AppHeader />
            <div className={styles.contentwrapper2}>
                <div className={styles.contentwrapper}>
                    <div className={styles.links}>
                        <NavLink to='/profile' className={styles.link} activeClassName={styles.activepane}>Профиль</NavLink>
                        <NavLink to='/orderhistory' className={styles.link} activeClassName={styles.activepane}>История заказов</NavLink>
                        <Link to='/' className={styles.link} onClick={() => dispatch(logout())}>Выход</Link>
                        <div className={styles.caption}>
                            В этом разделе вы можете изменить свои персональные данные
                        </div>
                    </div>


                    <div className={styles.profilecontent}>
                        <div className="pb-6">
                            <Input
                                type={'text'}
                                placeholder={'Имя'}
                                onChange={e => setNameValue(e.target.value)}
                                icon={'EditIcon'}
                                value={nameValue ? nameValue : " "}
                                name={'Имя'}
                                error={false}
                                innerFef={inputRef}
                                errorText={'Ошибка'}
                                size={'default'}
                            />
                        </div>


                        <div className="pb-6">
                            <Input
                                type={'text'}
                                placeholder={'Логин'}
                                onChange={e => setEmailValue(e.target.value)}
                                icon={'EditIcon'}
                                value={emailValue ? emailValue : " "}
                                name={'Логин'}
                                error={false}
                                innerFef={inputRef}
                                errorText={'Ошибка'}
                                size={'default'}
                            />
                        </div>

                        <div className="pb-6">
                            <PasswordInput
                                type={'text'}
                                placeholder={'Пароль'}
                                onChange={e => setPassValue(e.target.value)}
                                icon={'EditIcon'}
                                value={passValue}
                                name={'Пароль'}
                                error={false}
                                innerFef={inputRef}
                                errorText={'Ошибка'}
                                size={'default'}
                            />
                        </div>

                        <div>
                        <Button type="primary" size="medium" onClick={() => dispatch(setUserData(nameValue, emailValue, passValue))}>
                            Сохранить
                        </Button>

                        <Button type="secondary" size="medium" onClick={() => resetCredentials()}>
                            Отмена
                        </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}