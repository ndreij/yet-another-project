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
    RESET_PASSWORD_FAILED
} from '../constants';

import { initialState } from '../store'
import type { TAuthActions } from '../actions';

export const authReducer = (state = initialState, action: TAuthActions) => {
    switch (action.type) {

        case REGISTER: {
            return {
                ...state,
                isRegistering: true,
                registrationFailed: false,
            };
        }

        case REGISTER_SUCCESS: {
            return {
                ...state,
                accessToken: action.accessToken,
                isRegistering: false
            };
        }
        case REGISTER_FAILED: {
            return {
                ...state,
                isRegistering: false,
                registrationFailed: true
            };
        }

        case LOGIN: {
            return {
                ...state,
                isLoggingIn: true,
                logInFailed: false,
            }
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                logInFailed: false,
                isAuthLoaded: true
            };
        }

        case LOGIN_FAILED: {
            return {
                ...state,
                isLoggingIn: false,
                logInFailed: true,
                isAuthLoaded: true
            };
        }

        case LOGOUT_SUCCESS: {
            return {
                ...state,
                isLoggedIn: false,
            };
        }

        case LOGOUT_FAILED: {
            return {
                ...state,
                logOutFailed: true,
            };
        }

        case AUTH: {
            return {
                ...state,
                isLoggingIn: true,
                logInFailed: false,
            }
        }

        case AUTH_SUCCESS: {
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                isAuthLoaded: true
            };
        }

        case AUTH_FAILED: {
            return {
                ...state,
                isLoggingIn: false,
                logInFailed: true,
                isAuthLoaded: true
            };
        }

        case FORGOT_PASSWORD: {
            return {
                ...state,
                isForgotPasswordEmailSent: false
            }
        }

        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                isForgotPasswordEmailSent: true
            };
        }

        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
            };
        }

        case RESET_PASSWORD: {
            return {
                ...state,
                isPasswordReset: false
            }
        }

        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                isPasswordReset: true
            };
        }

        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
            };
        }

        case SET_USER_DATA: {
            return {
                ...state,
                userName: action.name,
                userEmail: action.email
            };
        }

        default:
            return state;
    }
}; 
