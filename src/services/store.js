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