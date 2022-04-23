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
    REMOVE_ITEM_FROM_CART,
    MOVE_CARD
} from '../constants';

import { IIngredient } from '../../utils/interfaces/ingredient';

export interface IIRegisterAction {
    readonly type: typeof REGISTER;
}
export interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED;
}
export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
    accessToken: string;
}
export interface ILoginAction {
    readonly type: typeof LOGIN;
}
export interface ILoginFailedAction {
    readonly type: typeof LOGIN_FAILED;
}
export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
}
export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
}
export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}
export interface IAuthAction {
    readonly type: typeof AUTH;
}
export interface IAuthFailedAction {
    readonly type: typeof AUTH_FAILED;
}
export interface IAuthSuccessAction {
    readonly type: typeof AUTH_SUCCESS;
}
export interface ISetUserDataAction {
    readonly type: typeof SET_USER_DATA;
    email: string;
    name: string;
}
export interface IForgotPasswordAction {
    readonly type: typeof FORGOT_PASSWORD;
}
export interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
export interface IForgotPasswordFailedAction {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}
export interface IResetPasswordAction {
    readonly type: typeof RESET_PASSWORD;
}
export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IGetIngredientsAction {
    readonly type: typeof GET_INGREDIENTS;
}
export interface IGetIngredientFailedsAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    data: IIngredient[]
}
export interface ISendOrderAction {
    readonly type: typeof SEND_ORDER;
}
export interface ISendOrderFailedAction {
    readonly type: typeof SEND_ORDER_FAILED;
}
export interface ISendOrderSuccessAction {
    readonly type: typeof SEND_ORDER_SUCCESS;
}
export interface IRemoveItemFromCartAction {
    readonly type: typeof REMOVE_ITEM_FROM_CART;
}
export interface IMoveCardsAction {
    readonly type: typeof MOVE_CARD;
}

export type TAuthActions =
    | IIRegisterAction
    | IRegisterFailedAction
    | IRegisterSuccessAction
    | ILoginAction
    | ILoginFailedAction
    | ILoginSuccessAction
    | ILogoutFailedAction
    | ILogoutSuccessAction
    | IAuthAction
    | IAuthFailedAction
    | IAuthSuccessAction
    | ISetUserDataAction
    | IForgotPasswordAction
    | IForgotPasswordSuccessAction
    | IForgotPasswordFailedAction
    | IResetPasswordAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailedAction
    | IGetIngredientsAction
    | IGetIngredientFailedsAction
    | IGetIngredientsSuccessAction
    | ISendOrderAction
    | ISendOrderFailedAction
    | ISendOrderSuccessAction
    | IRemoveItemFromCartAction
    | IMoveCardsAction