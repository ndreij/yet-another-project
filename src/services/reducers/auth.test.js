import { authReducer } from './auth'
import * as types from '../constants'

const initialState = {
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

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(
      {
        ...initialState
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
        ...initialState,
        isRegistering: true,
        registrationFailed: false,
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
        ...initialState,
        isRegistering: false,
        accessToken: 'token'
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
        ...initialState,
        isLoggingIn: true,
        logInFailed: false,
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
        ...initialState,
        isLoggingIn: false,
        isLoggedIn: true,
        logInFailed: false,
        isAuthLoaded: true,
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
        ...initialState,
        isLoggingIn: false,
        logInFailed: true,
        isAuthLoaded: true,
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
        ...initialState,
        isLoggingIn: false,
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
        ...initialState,
        logOutFailed: true
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
        ...initialState,
        isLoggedIn: false,
        isLoggingIn: true
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
        ...initialState,
        isLoggingIn: false,
        isLoggedIn: true,
        isAuthLoaded: true,
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
        ...initialState,
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
        ...initialState,
        isForgotPasswordEmailSent: false
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
        ...initialState,
        isForgotPasswordEmailSent: true
      }
    )
  })

  it('should handle FORGOT_PASSWORD_FAILED', () => {
    expect(
      authReducer(undefined, {
        type: types.FORGOT_PASSWORD_FAILED,
      }
      )
    ).toEqual(
      {
        ...initialState
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
        ...initialState,
        isPasswordReset: false
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
        ...initialState,
        isPasswordReset: true
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
        ...initialState,
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
        ...initialState,
        userEmail: 'email',
        userName: 'name',
      }
    )
  })

})