import { getAuth } from '../../services/actions';
import { Route, Redirect, useLocation, RouteProps} from 'react-router-dom';
import { useEffect, useCallback, FC } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const isAuthLoaded = useSelector((state) => state.auth.isAuthLoaded)
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