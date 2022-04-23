import { feedReducer } from './feed.ts'
import * as types from '../constants'

describe('feed reducer', () => {
  it('should return the initial state', () => {
    expect(feedReducer(undefined, {})).toEqual(
      {
        orders: null,
        totalToday: null,
        total: null,
      }
    )
  })

  it('should handle PROCESS_ORDERS', () => {
    expect(
      feedReducer([], {
        type: types.PROCESS_ORDERS,
        payload: {
            data:{
                orders: [{name: 'order1'}, {name: 'order2'}], 
                total: 1, 
                totalToday: 1
      },
      type: 'personal'
    }})
    ).toEqual(
      {
        orders: [{name: 'order2', _isOwn: true}, {name: 'order1', _isOwn: true}],
        totalToday: 1,
        total: 1,
      }
    )
  })
})