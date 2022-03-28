import { baseUrl, checkResponse } from '../../api'
import {
    REGISTER,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS,
    AUTH_FAILED,
    AUTH_SUCCESS,
    SET_USER_DATA,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED
} from '.';

export function register(nameValue, emailValue, passValue) {

    return function (dispatch) {

        const registerData = { email: emailValue, password: passValue, name: nameValue }

        dispatch({
            type: REGISTER
        })
        fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(registerData),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(checkResponse)
            .then(res => {
                if (res && res.success) {
                    const accessToken = res.accessToken.split('Bearer ')[1];
                    const refreshToken = res.refreshToken
                    if (accessToken) {
                        setCookie('accessToken', accessToken);
                    }
                    if (refreshToken) {
                        setCookie('refreshToken', refreshToken);
                    }

                    dispatch({
                        type: REGISTER_SUCCESS,
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    })
                } else {
                    dispatch({
                        type: REGISTER_FAILED
                    })
                }
            }).catch(err => {
                dispatch({
                    type: REGISTER_FAILED
                })
            })
    }
}

export function login(emailValue, passValue) {

    return function (dispatch, getState) {

        const loginData = { email: emailValue, password: passValue }

        dispatch({
            type: LOGIN
        })

        fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(checkResponse)
            .then(res => {
                if (res && res.success) {

                    const accessToken = res.accessToken.split('Bearer ')[1];
                    const refreshToken = res.refreshToken
                    if (accessToken) {
                        setCookie('accessToken', accessToken);
                    }
                    if (refreshToken) {
                        setCookie('refreshToken', refreshToken);
                    }

                    dispatch({
                        type: LOGIN_SUCCESS,
                        name: res.user.name,
                        email: res.user.email
                    })
                } else {
                    dispatch({
                        type: LOGIN_FAILED
                    })
                }
            }).catch(err => {
                dispatch({
                    type: LOGIN_FAILED
                })
            })
    }
}

export function logout() {

    return function (dispatch) {

        const refreshToken = getCookie('refreshToken')

        fetch(`${baseUrl}/auth/logout`, {
            method: 'POST',
            body: JSON.stringify({
                token: refreshToken
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(checkResponse)
            .then(res => {
                if (res && res.success) {
                    setCookie('accessToken', 'accessToken',0)
                    setCookie('refreshToken', 'refreshToken',0)
                    dispatch({
                        type: LOGOUT_SUCCESS,
                    })
                } else {
                    dispatch({
                        type: LOGOUT_FAILED
                    })
                }
            }).catch(err => {
                dispatch({
                    type: LOGOUT_FAILED
                })
            })
    }
}

export function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name) {
    const matches = document.cookie.match(
        // eslint-disable-next-line
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function getAuth() {

    return function (dispatch) {
        fetch(`${baseUrl}/auth/user`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
            .then(checkResponse)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: AUTH_SUCCESS,
                    })
                } else {
                    const refreshToken = getCookie('refreshToken')
                    if (!refreshToken) {
                        dispatch({
                            type: AUTH_FAILED
                        })
                    } else {
                        fetch(`${baseUrl}/auth/token`, {
                            method: 'POST',
                            body: JSON.stringify({
                                token: refreshToken
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        })
                            .then(checkResponse)
                            .then(res => {
                                if (res && res.success) {

                                    const accessToken = res.accessToken.split('Bearer ')[1];
                                    const refreshToken = res.refreshToken
                                    if (accessToken) {
                                        setCookie('accessToken', accessToken);
                                    }
                                    if (refreshToken) {
                                        setCookie('refreshToken', refreshToken);
                                    }

                                    dispatch({
                                        type: AUTH_SUCCESS,
                                    })
                                } else {
                                    dispatch({
                                        type: AUTH_FAILED
                                    })
                                }
                            }).catch(err => {
                                dispatch({
                                    type: AUTH_FAILED
                                })
                            })
                    }
                }
            });
    }
}

export function getUserData() {
    return function (dispatch) {
        fetch(`${baseUrl}/auth/user`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
            .then(checkResponse)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: SET_USER_DATA,
                        name: res.user.name,
                        email: res.user.email
                    })
                }
            });
    }
}

export function setUserData(nameValue, emailValue, passValue) {
    return function (dispatch) {
        fetch(`${baseUrl}/auth/user`, {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            body: JSON.stringify({ name: nameValue, email: emailValue, password: passValue }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
            .then(checkResponse)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: SET_USER_DATA,
                        name: res.user.name,
                        email: res.user.email
                    })
                } else {

                }
            });
    }
}

export function forgotPassword(emailValue) {

    return function (dispatch) {

        dispatch({
            type: FORGOT_PASSWORD
        })

        fetch(`${baseUrl}/password-reset`, {
            method: 'POST',
            body: JSON.stringify({ email: emailValue }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(checkResponse)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: FORGOT_PASSWORD_SUCCESS,
                    })
                    setCookie('emailSent', 'emailSent')
                } else {
                    dispatch({
                        type: FORGOT_PASSWORD_FAILED
                    })
                }
            }).catch(err => {
                dispatch({
                    type: FORGOT_PASSWORD_FAILED
                })
            })
    }
}

export function resetPassword(passValue, tokenValue) {

    return function (dispatch) {

        dispatch({
            type: RESET_PASSWORD
        })

        fetch(`${baseUrl}/password-reset/reset`, {
            method: 'POST',
            body: JSON.stringify({ password: passValue, token: tokenValue }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(checkResponse)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS,
                    })
                } else {
                    dispatch({
                        type: RESET_PASSWORD_FAILED
                    })
                }
            }).catch(err => {
                dispatch({
                    type: RESET_PASSWORD_FAILED
                })
            })
    }
}