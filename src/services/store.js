export const initialState = {
    orderNumber: 0,
    totalPrice: 0,
    modalState: {
        visible: false,
        header: '',
        content: 'ingredient',
        item: {}
    },
    data : [],
    cart: [],

    dataRequest: false,
    dataFailed: false,
    orderRequest: false,
    orderFailed: false,

};

export const initialAuthState = {
    isLoggedIn: false,
    userEmail: '',
    userName: '',
    accessToken: '',
    refreshToken: '',
    isLoggingIn: false,
    logInFailed: false,
    isRegistering: false,
    registrationFailed: false,
    isAuthLoaded: false,
    logOutFailed: false,
    isForgotPasswordEmailSent: false,
    isPasswordReset: false
};