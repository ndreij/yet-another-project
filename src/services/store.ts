
export const initialState = {
    orderNumber: 0,
    totalPrice: 0,
    modalState: {
        visible: false,
        header: '',
        content: 'ingredient',
        item: {}
    },
    data: [],
    cart: [],

    dataRequest: false,
    dataFailed: false,
    orderRequest: false,
    orderFailed: false,

    feed: {
        total: 0,
        totalToday: 0,
        orders: [{
            _id: '',
            ingredients: [],
            name: '',
            status: '',
            number: 0,
            createdAt: '',
            updatedAt: '',
            _isOwn: false,
        }],
    },

    ingredients: [],
    connected: false,
    error: null,
    messages: [],
};