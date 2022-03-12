import { getAuth } from '../../services/actions/authactions.js';
import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

export function ProtectedRoute({ children, ...rest }) {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const isAuthLoaded = useSelector(state => state.auth.isAuthLoaded)
    const dispatch = useDispatch()

    const init = () => {
        dispatch(getAuth());
    };

    useEffect(() => {
        init();
    }, []);

    if (!isAuthLoaded) {
        return null;
    }

    return (
        <Route
            {...rest}
            render={() =>
                isLoggedIn ? (
                    children
                ) : (
                    // Если пользователя нет в хранилище, происходит переадресация на роут /login
                    <Redirect to='/login' />
                    
                )
            }
        />
    );
} 