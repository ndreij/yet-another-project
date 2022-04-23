import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { AppDispatch, AppThunk, RootState } from './types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { wsConnect, wsDisconnect } from '../services/actions/websockets';
import { webSocketURL } from './constants';

import { getCookie } from 'services/actions'

export const getTokens = () => {
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');
  return { accessToken, refreshToken };
};

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

export const useWebSocket = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const { pathname } = location;
    let type = '';
    if (pathname.startsWith('/feed')) {
      type = 'all';
    } else if (pathname.startsWith('/profile/orders')) {
      type = 'personal';
    }

    let url = `${webSocketURL}/orders`;
    switch (type) {
      case 'all':
        url += '/all';
        break;
      case 'personal': {
        const { accessToken } = getTokens();
        url += `?token=${accessToken}`;
        break;
      }
      default:
    }
    
    dispatch(wsConnect({ url, type }));

    return () => { dispatch(wsDisconnect()); };
  }, [location, dispatch]);
};
