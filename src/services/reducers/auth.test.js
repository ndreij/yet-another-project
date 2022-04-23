import { authReducer } from './auth'
import * as types from '../constants'

describe('auth reducer', () => {
    it('should return the initial state', () => {
      expect(authReducer(undefined, {})).toEqual(
        {
            isRegistering: false,
            registrationFailed: false,
            accessToken: '',
            refreshToken: '',
            isLoggingIn: false,
            isLoggedIn: false,
            logInFailed: false,
            isAuthLoaded: false,
            logOutFailed: false,
            userEmail: '',
            userName: '',
            isForgotPasswordEmailSent: false,
            isPasswordReset: false,
        }
      )
    })

    it('should handle REGISTER', () => {
        expect(
            authReducer(undefined, {
            type: types.REGISTER,
          }
        )
        ).toEqual(
          {
            isRegistering: true,
            registrationFailed: false,
            accessToken: '',
            refreshToken: '',
            isLoggingIn: false,
            isLoggedIn: false,
            logInFailed: false,
            isAuthLoaded: false,
            logOutFailed: false,
            userEmail: '',
            userName: '',
            isForgotPasswordEmailSent: false,
            isPasswordReset: false,
          }
        )
      })

      it('should handle REGISTER_SUCCESS', () => {
        expect(
            authReducer(undefined, {
            type: types.REGISTER_SUCCESS,
            accessToken: 'token'
          }
        )
        ).toEqual(
          {
            isRegistering: false,
            registrationFailed: false,
            accessToken: 'token',
            refreshToken: '',
            isLoggingIn: false,
            isLoggedIn: false,
            logInFailed: false,
            isAuthLoaded: false,
            logOutFailed: false,
            userEmail: '',
            userName: '',
            isForgotPasswordEmailSent: false,
            isPasswordReset: false,
          }
        )
      })

      it('should handle LOGIN', () => {
        expect(
            authReducer(undefined, {
            type: types.LOGIN,
          }
        )
        ).toEqual(
          {
            isRegistering: false,
            registrationFailed: false,
            accessToken: '',
            refreshToken: '',
            isLoggedIn: false,
            isLoggingIn: true,
            logInFailed: false,
            isAuthLoaded: false,
            logOutFailed: false,
            userEmail: '',
            userName: '',
            isForgotPasswordEmailSent: false,
            isPasswordReset: false,
          }
        )
      })

      it('should handle LOGIN_SUCCESS', () => {
        expect(
            authReducer(undefined, {
            type: types.LOGIN_SUCCESS,
          }
        )
        ).toEqual(
          {
            isRegistering: false,
            registrationFailed: false,
            accessToken: '',
            refreshToken: '',
            isLoggingIn: false,
            isLoggedIn: true,
            logInFailed: false,
            isAuthLoaded: true,
            logOutFailed: false,
            userEmail: '',
            userName: '',
            isForgotPasswordEmailSent: false,
            isPasswordReset: false,
          }
        )
      })

      it('should handle LOGIN_FAILED', () => {
        expect(
            authReducer(undefined, {
            type: types.LOGIN_FAILED,
          }
        )
        ).toEqual(
          {
            isRegistering: false,
            registrationFailed: false,
            accessToken: '',
            refreshToken: '',  
            isLoggedIn: false,
            isLoggingIn: false,
            logInFailed: true,
            isAuthLoaded: true,
            logOutFailed: false,
            userEmail: '',
            userName: '',
            isForgotPasswordEmailSent: false,
            isPasswordReset: false,
          }
        )
      })

      it('should handle LOGOUT_SUCCESS', () => {
        expect(
            authReducer(undefined, {
            type: types.LOGOUT_SUCCESS,
          }
        )
        ).toEqual(
          {
            isRegistering: false,
            registrationFailed: false,
            accessToken: '',
            refreshToken: '',
            isLoggingIn: false,
            isLoggedIn: false,
            logInFailed: false,
            isAuthLoaded: false,
            logOutFailed: false,
            userEmail: '',
            userName: '',
            isForgotPasswordEmailSent: false,
            isPasswordReset: false,
          }
        )
      })

      it('should handle LOGOUT_FAILED', () => {
        expect(
            authReducer(undefined, {
            type: types.LOGOUT_FAILED,
          }
        )
        ).toEqual(
          {
            isRegistering: false,
            registrationFailed: false,
            accessToken: '',
            refreshToken: '',
            isLoggingIn: false,
            isLoggedIn: false,
            logInFailed: false,
            isAuthLoaded: false,
            logOutFailed: true,
            userEmail: '',
            userName: '',
            isForgotPasswordEmailSent: false,
            isPasswordReset: false,
          }
        )
      })

      it('should handle AUTH', () => {
        expect(
            authReducer(undefined, {
            type: types.AUTH,
          }
        )
        ).toEqual(
          {
            isRegistering: false,
            registrationFailed: false,
            accessToken: '',
            refreshToken: '',
            isLoggingIn: true,
            isLoggedIn: false,
            logInFailed: false,
            isAuthLoaded: false,
            logOutFailed: false,
            userEmail: '',
            userName: '',
            isForgotPasswordEmailSent: false,
            isPasswordReset: false,
          }
        )
      })

      it('should handle AUTH_SUCCESS', () => {
        expect(
            authReducer(undefined, {
            type: types.AUTH_SUCCESS,
          }
        )
        ).toEqual(
          {
            isRegistering: false,
            registrationFailed: false,
            accessToken: '',
            refreshToken: '',
            isLoggingIn: false,
            isLoggedIn: true,
            isAuthLoaded: true,
            logInFailed: false,
            logOutFailed: false,
            userEmail: '',
            userName: '',
            isForgotPasswordEmailSent: false,
            isPasswordReset: false,
          }
        )
      })

      it('should handle AUTH_FAILED', () => {
        expect(
            authReducer(undefined, {
            type: types.AUTH_FAILED,
          }
        )
        ).toEqual(
          {
            isRegistering: false,
            registrationFailed: false,
            accessToken: '',
            refreshToken: '',
            isLoggedIn: false,
            logOutFailed: false,
            userEmail: '',
            userName: '',
            isForgotPasswordEmailSent: false,
            isPasswordReset: false,
            isLoggingIn: false,
            logInFailed: true,
            isAuthLoaded: true
          }
        )
      })

      it('should handle FORGOT_PASSWORD', () => {
        expect(
            authReducer(undefined, {
            type: types.FORGOT_PASSWORD,
          }
        )
        ).toEqual(
          {
            isRegistering: false,
            registrationFailed: false,
            accessToken: '',
            refreshToken: '',
            isLoggingIn: false,
            isLoggedIn: false,
            logInFailed: false,
            isAuthLoaded: false,
            logOutFailed: false,
            userEmail: '',
            userName: '',
            isForgotPasswordEmailSent: false,
            isPasswordReset: false,
          }
        )
      })

      it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(
            authReducer(undefined, {
            type: types.FORGOT_PASSWORD_SUCCESS,
          }
        )
        ).toEqual(
          {
            isRegistering: false,
            registrationFailed: false,
            accessToken: '',
            refreshToken: '',
            isLoggingIn: false,
            isLoggedIn: false,
            logInFailed: false,
            isAuthLoaded: false,
            logOutFailed: false,
            userEmail: '',
            userName: '',
            isForgotPasswordEmailSent: true,
            isPasswordReset: false,
          }
        )
      })

      it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(
            authReducer(undefined, {
            type: types.FORGOT_PASSWORD_SUCCESS,
          }
        )
        ).toEqual(
          {
            isRegistering: false,
            registrationFailed: false,
            accessToken: '',
            refreshToken: '',
            isLoggingIn: false,
            isLoggedIn: false,
            logInFailed: false,
            isAuthLoaded: false,
            logOutFailed: false,
            userEmail: '',
            userName: '',
            isForgotPasswordEmailSent: true,
            isPasswordReset: false,
          }
        )
      })

      it('should handle RESET_PASSWORD', () => {
        expect(
            authReducer(undefined, {
            type: types.RESET_PASSWORD,
          }
        )
        ).toEqual(
          {
            isRegistering: false,
            registrationFailed: false,
            accessToken: '',
            refreshToken: '',
            isLoggingIn: false,
            isLoggedIn: false,
            logInFailed: false,
            isAuthLoaded: false,
            logOutFailed: false,
            userEmail: '',
            userName: '',
            isForgotPasswordEmailSent: false,
            isPasswordReset: false,
          }
        )
      })

      it('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(
            authReducer(undefined, {
            type: types.RESET_PASSWORD_SUCCESS,
          }
        )
        ).toEqual(
          {
            isRegistering: false,
            registrationFailed: false,
            accessToken: '',
            refreshToken: '',
            isLoggingIn: false,
            isLoggedIn: false,
            logInFailed: false,
            isAuthLoaded: false,
            logOutFailed: false,
            userEmail: '',
            userName: '',
            isForgotPasswordEmailSent: false,
            isPasswordReset: true,
          }
        )
      })

      it('should handle RESET_PASSWORD_FAILED', () => {
        expect(
            authReducer(undefined, {
            type: types.RESET_PASSWORD_FAILED,
          }
        )
        ).toEqual(
          {
            isRegistering: false,
            registrationFailed: false,
            accessToken: '',
            refreshToken: '',
            isLoggingIn: false,
            isLoggedIn: false,
            logInFailed: false,
            isAuthLoaded: false,
            logOutFailed: false,
            userEmail: '',
            userName: '',
            isForgotPasswordEmailSent: false,
            isPasswordReset: false,
          }
        )
      })

      it('should handle SET_USER_DATA', () => {
        expect(
            authReducer(undefined, {
            type: types.SET_USER_DATA,
            name: 'name',
            email: 'email'
          }
        )
        ).toEqual(
          {
            isRegistering: false,
            registrationFailed: false,
            accessToken: '',
            refreshToken: '',
            isLoggingIn: false,
            isLoggedIn: false,
            logInFailed: false,
            isAuthLoaded: false,
            logOutFailed: false,
            userEmail: 'email',
            userName: 'name',
            isForgotPasswordEmailSent: false,
            isPasswordReset: false,
          }
        )
      })

})