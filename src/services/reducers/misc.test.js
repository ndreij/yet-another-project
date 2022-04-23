import { miscReducer } from './misc'
import * as types from '../constants'

describe('misc reducer', () => {
    it('should return the initial state', () => {
        expect(miscReducer(undefined, {})).toEqual(
            {
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
            }
        )
    })

    it('should handle UPDATE_TOTAL_PRICE', () => {
        expect(
            miscReducer(undefined, {
                type: types.UPDATE_TOTAL_PRICE,
                payload: 1
            }
            )
        ).toEqual(
            {
                orderNumber: 0,
                totalPrice: 1,
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
            }
        )
    })

    it('should handle HIDE_MODAL', () => {
        expect(
            miscReducer(undefined, {
                type: types.HIDE_MODAL,
            }
            )
        ).toEqual(
            {
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
            }
        )
    })

    it('should handle SHOW_INGREDIENT_MODAL', () => {
        expect(
            miscReducer(undefined, {
                type: types.SHOW_INGREDIENT_MODAL,
                payload: { item: 'item' }
            }
            )
        ).toEqual(
            {
                orderNumber: 0,
                totalPrice: 0,
                modalState: {
                    visible: true,
                    header: 'Детали ингредиента',
                    content: 'ingredient',
                    item: { item: 'item' }
                },
                data: [],
                cart: [],
                dataRequest: false,
                dataFailed: false,
                orderRequest: false,
                orderFailed: false,
            }
        )
    })

    it('should handle UPDATE_CART', () => {
        expect(
            miscReducer(undefined, {
                type: types.UPDATE_CART,
                payload: [{ item: '1' }, { item: '2' }, { item: '3' }]
            }
            )
        ).toEqual(
            {
                orderNumber: 0,
                totalPrice: 0,
                modalState: {
                    visible: false,
                    header: '',
                    content: 'ingredient',
                    item: {}
                },
                data: [],
                cart: [{ item: '1' }, { item: '2' }, { item: '3' }],
                dataRequest: false,
                dataFailed: false,
                orderRequest: false,
                orderFailed: false,
            }
        )
    })

    it('should handle REMOVE_ITEM_FROM_CART', () => {
        expect(
            miscReducer({
                orderNumber: 0,
                totalPrice: 0,
                modalState: {
                    visible: false,
                    header: '',
                    content: 'ingredient',
                    item: {}
                },
                data: [],
                cart: [{ item: '1', uuid: 'uuid' }, { item: '2' }, { item: '3' }],
                dataRequest: false,
                dataFailed: false,
                orderRequest: false,
                orderFailed: false,
            }, {
                type: types.REMOVE_ITEM_FROM_CART,
                payload: 'uuid'
            }
            )
        ).toEqual(
            {
                orderNumber: 0,
                totalPrice: 0,
                modalState: {
                    visible: false,
                    header: '',
                    content: 'ingredient',
                    item: {}
                },
                data: [],
                cart: [{ item: '2' }, { item: '3' }],
                dataRequest: false,
                dataFailed: false,
                orderRequest: false,
                orderFailed: false,
            }
        )
    })

    it('should handle MOVE_CARD', () => {
        expect(
            miscReducer({
                orderNumber: 0,
                totalPrice: 0,
                modalState: {
                    visible: false,
                    header: '',
                    content: 'ingredient',
                    item: {}
                },
                data: [],
                cart: [{ item: '1' }, { item: '2' }, { item: '3' }],
                dataRequest: false,
                dataFailed: false,
                orderRequest: false,
                orderFailed: false,
            }, {
                type: types.MOVE_CARD,
                payload: [{ item: '2' }, { item: '1' }, { item: '3' }],
            }
            )
        ).toEqual(
            {
                orderNumber: 0,
                totalPrice: 0,
                modalState: {
                    visible: false,
                    header: '',
                    content: 'ingredient',
                    item: {}
                },
                data: [],
                cart: [{ item: '2' }, { item: '1' }, { item: '3' }],
                dataRequest: false,
                dataFailed: false,
                orderRequest: false,
                orderFailed: false,
            }
        )
    })

    it('should handle GET_INGREDIENTS', () => {
        expect(
            miscReducer(undefined, {
                type: types.GET_INGREDIENTS,
                payload: 1
            }
            )
        ).toEqual(
            {
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
                dataRequest: true,
                dataFailed: false,
                orderRequest: false,
                orderFailed: false,
            }
        )
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(
            miscReducer(undefined, {
                type: types.GET_INGREDIENTS_SUCCESS,
                data: ['data']
            }
            )
        ).toEqual(
            {
                orderNumber: 0,
                totalPrice: 0,
                modalState: {
                    visible: false,
                    header: '',
                    content: 'ingredient',
                    item: {}
                },
                data: ['data'],
                cart: [],
                dataRequest: false,
                dataFailed: false,
                orderRequest: false,
                orderFailed: false,
            }
        )
    })

    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(
            miscReducer(undefined, {
                type: types.GET_INGREDIENTS_FAILED,
                payload: 1
            }
            )
        ).toEqual(
            {
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
                dataFailed: true,
                dataRequest: false,
                orderRequest: false,
                orderFailed: false,
            }
        )
    })

    it('should handle SEND_ORDER', () => {
        expect(
            miscReducer(undefined, {
                type: types.SEND_ORDER,
                payload: 1
            }
            )
        ).toEqual(
            {
                orderNumber: 0,
                totalPrice: 0,
                modalState: {
                    visible: true,
                    content: 'total',
                    header: '',
                    item: {}
                },
                data: [],
                cart: [],
                dataRequest: false,
                dataFailed: false,
                orderRequest: true,
                orderFailed: false,
            }
        )
    })

    it('should handle SEND_ORDER_SUCCESS', () => {
        expect(
            miscReducer(undefined, {
                type: types.SEND_ORDER_SUCCESS,
                payload: {order: {number: 1}}
            }
            )
        ).toEqual(
            {
                orderNumber: 1,
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
            }
        )
    })

    it('should handle SEND_ORDER_FAILED', () => {
        expect(
            miscReducer(undefined, {
                type: types.SEND_ORDER_FAILED,
                payload: {order: {number: 1}}
            }
            )
        ).toEqual(
            {
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
                orderFailed: true,
            }
        )
    })

})