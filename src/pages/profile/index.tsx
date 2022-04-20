import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState, useRef, useEffect } from 'react'
import styles from '../pages.module.css'
import { Link, NavLink } from 'react-router-dom'
import { getUserData, setUserData, logout } from '../../services/actions'
import { useSelector, useDispatch } from '../../services/hooks';

export function ProfilePage() {

    const [nameValue, setNameValue] = useState(' ')
    const [emailValue, setEmailValue] = useState(' ')
    const [passValue, setPassValue] = useState('')

    const inputRef = useRef(null)

    const dispatch = useDispatch();

    const newName = useSelector((state) => state.auth.userName)
    const newEmail = useSelector((state) => state.auth.userEmail)

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
            <div className={styles.contentwrapper2}>
                <div className={styles.contentwrapper}>
                    <div className={styles.links}>
                        <NavLink to='/profile' className={styles.link} activeClassName={styles.activepane}>Профиль</NavLink>
                        <NavLink to='/profile/orders' className={styles.link} activeClassName={styles.activepane}>История заказов</NavLink>
                        <Link to='/' className={styles.link} onClick={() => dispatch(logout())}>Выход</Link>
                        <div className={styles.caption}>
                            В этом разделе вы можете изменить свои персональные данные
                        </div>
                    </div>

                    <form onSubmit={e => {e.preventDefault(); dispatch(setUserData(nameValue, emailValue, passValue)) }}>
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
                                ref={inputRef}
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
                                ref={inputRef}
                                errorText={'Ошибка'}
                                size={'default'}
                            />
                        </div>

                        <div className="pb-6">
                            <PasswordInput
                                onChange={e => setPassValue(e.target.value)}
                                value={passValue}
                                name={'Пароль'}
                                size={'default'}
                            />
                        </div>

                        <div>
                        <Button type="primary" size="medium">
                            Сохранить
                        </Button>
                        

                        <Button type="secondary" size="medium" onClick={() => resetCredentials()}>
                            Отмена
                        </Button>
                        </div>
                        
                    </div>
                    </form>
                </div>
            </div>
        </>
    )
}