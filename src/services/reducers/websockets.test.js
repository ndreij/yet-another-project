import { websocketsReducer } from './websockets.ts'
import * as types from '../constants'

describe('websockets reducer', () => {
    it('should return the initial state', () => {
        expect(websocketsReducer(undefined, {})).toEqual(
            {
                connected: false,
                error: null,
                messages: [],
            }
        )
    })

    it('should handle WS_CONNECTION_INIT', () => {

        expect(
            websocketsReducer(undefined, {
                type: types.WS_CONNECTION_INIT
            }
            )
        ).toEqual(
            {
                connected: false,
                error: null,
                messages: []
            }
        )
    })

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(
            websocketsReducer(undefined, {
                type: types.WS_CONNECTION_SUCCESS
            }
            )
        ).toEqual(
            {
                connected: true,
                error: null,
                messages: []
            }
        )
    })

    it('should handle WS_CONNECTION_ERROR', () => {
        expect(
            websocketsReducer(undefined, {
                type: types.WS_CONNECTION_ERROR,
                payload: 'error'
            }
            )
        ).toEqual(
            {
                connected: false,
                error: 'error',
                messages: []
            }
        )
    })

    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(
            websocketsReducer(undefined, {
                type: types.WS_CONNECTION_CLOSED,
            }
            )
        ).toEqual(
            {
                connected: false,
                error: null,
                messages: []
            }
        )
    })

    it('should handle WS_ON_MESSAGE', () => {
        expect(
            websocketsReducer(undefined, {
                type: types.WS_ON_MESSAGE,
                payload: 'message'
            }
            )
        ).toEqual(
            {
                connected: false,
                error: null,
                messages: ['message']
            }
        )
    })

})