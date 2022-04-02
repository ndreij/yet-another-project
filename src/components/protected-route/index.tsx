import { getAuth } from '../../services/actions/authactions';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useEffect, useCallback, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux'

interface ProtectedRouteProps {
    path: string
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, ...rest }) => {
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn)
    const isAuthLoaded = useSelector((state: any) => state.auth.isAuthLoaded)
    const dispatch = useDispatch()
    const location = useLocation()

    const init = useCallback(() => {
        dispatch(getAuth());
    }, [dispatch]);

    useEffect(() => {
        init();
    }, [init]);

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
                    <Redirect to={{ pathname: "/login", state: { from: location } }} />
                    
                )
            }
        />
    );
} 