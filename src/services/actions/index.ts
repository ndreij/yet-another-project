import { baseUrl, checkResponse } from '../../api'
import { AppDispatch, AppThunk, RootState } from '../types';
import {
    REGISTER,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS,
    AUTH,
    AUTH_FAILED,
    AUTH_SUCCESS,
    SET_USER_DATA,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    SEND_ORDER,
    SEND_ORDER_FAILED,
    SEND_ORDER_SUCCESS,
    UPDATE_TOTAL_PRICE,
    SHOW_INGREDIENT_MODAL,
    HIDE_MODAL,
    UPDATE_CART,
    REMOVE_ITEM_FROM_CART,
    MOVE_CARD,
} from '../constants';

import { Item, cartItem } from "../../utils/types"

import { IIngredient } from '../../utils/interfaces/ingredient';
import { IOrderDetails } from '../../utils/interfaces/order';
import { TModalState } from '../../utils/types'

export interface IUpdateTotalPriceAction {
    readonly type: typeof UPDATE_TOTAL_PRICE;
    readonly payload: number
}

export interface IShowIngredientModalAction {
    readonly type: typeof SHOW_INGREDIENT_MODAL;
    readonly payload: TModalState
}

export interface IHideModalAction {
    readonly type: typeof HIDE_MODAL;
    readonly modalState: TModalState
}

export interface IUpdateCartAction {
    readonly type: typeof UPDATE_CART;
    readonly payload: Array<cartItem>
}

export interface IRemoveItemFromCartAction {
    readonly type: typeof REMOVE_ITEM_FROM_CART;
    readonly payload: string;
}

export interface IMoveCardAction {
    readonly type: typeof MOVE_CARD;
    readonly payload: Array<cartItem>
}

export interface IGetIngredientsAction {
    readonly type: typeof GET_INGREDIENTS;
    dataRequest: boolean,
    dataFailed: boolean,
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    data: cartItem[]
    dataRequest: boolean 
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
    dataFailed: boolean,
    dataRequest: boolean 
}

export interface ISendOrderAction {
    readonly type: typeof SEND_ORDER;
    orderRequest: boolean,
    orderFailed: boolean
}

export interface ISendOrderSuccessAction {
    readonly type: typeof SEND_ORDER_SUCCESS;
    payload: {
        order: IOrderDetails
        orderRequest: boolean,
    }
}

export interface ISendOrderFailedAction {
    readonly type: typeof SEND_ORDER_FAILED;
    orderFailed: boolean,
    orderRequest: boolean,
}

export type TMiscActions =
| IUpdateTotalPriceAction
| IShowIngredientModalAction
| IHideModalAction
| IUpdateCartAction
| IRemoveItemFromCartAction
| IMoveCardAction
| IGetIngredientsAction
| IGetIngredientsSuccessAction
| IGetIngredientsFailedAction
| ISendOrderAction
| ISendOrderSuccessAction
| ISendOrderFailedAction


export const register: AppThunk = (nameValue: string, emailValue: string, passValue: string) => {

    return function (dispatch: AppDispatch) {

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

export const login: AppThunk = (emailValue, passValue) => {

    return function (dispatch: AppDispatch) {

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

export const logout: AppThunk = () => {

    return function (dispatch: AppDispatch) {

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
                    setCookie('accessToken', 'accessToken', 0)
                    setCookie('refreshToken', 'refreshToken', 0)
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

export const setCookie = (name: string, value: string, props?: any) => {
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

export const getCookie = (name: string) => {
    const matches = document.cookie.match(
        // eslint-disable-next-line
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const getAuth: AppThunk = () => {

    return function (dispatch: AppDispatch) {
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

export const getUserData: AppThunk = () => {
    return function (dispatch: AppDispatch) {
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

export const setUserData: AppThunk = (nameValue, emailValue, passValue) => {
    return function (dispatch: AppDispatch) {
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

export const forgotPassword: AppThunk = (emailValue) => {

    return function (dispatch: AppDispatch) {

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

export const resetPassword: AppThunk = (passValue: string, tokenValue: string) => {

    return function (dispatch: AppDispatch) {

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

export const getIngredients: AppThunk = () => {

    return function (dispatch: AppDispatch) {

        dispatch({
            type: GET_INGREDIENTS
        })
        fetch(`${baseUrl}/ingredients`)
            .then(checkResponse)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        data: res.data
                    })
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    })
                }
            }).catch(err => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            })
    }
}

export const sendOrder: AppThunk = () => {

    return function (dispatch: AppDispatch, getState: () => RootState) {
        const cart = getState().miscList.cart
        const cartIds = cart.map((item) => item._id);
        const wrappedCartIds = { ingredients: Object.values(cartIds) }

        const token = 'Bearer ' + getCookie('accessToken')

        dispatch({
            type: SEND_ORDER
        })
        fetch(`${baseUrl}/orders`, {
            method: 'POST',
            body: JSON.stringify(wrappedCartIds),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
        })
            .then(checkResponse)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: SEND_ORDER_SUCCESS,
                        payload: res
                    })
                } else {
                    dispatch({
                        type: SEND_ORDER_FAILED
                    })
                }
            }).catch(err => {
                dispatch({
                    type: SEND_ORDER_FAILED
                })
            })
    }
}

