import { useSelector } from '../../services/hooks/hooks';
import { Route, Redirect } from 'react-router-dom';
import { FC, PropsWithChildren } from 'react'

export const ProtectedRoute: FC<PropsWithChildren<{ path: string, exact: boolean }>> = ({ children, ...rest }) => {
    const user = useSelector(state => state.userReducer)
    const auth = user.isAuthenticated

    return (
        <Route
            {...rest}
            render={({ location }) => auth ? (
                children
            ) : (<Redirect
                to={{
                    pathname: '/login',
                    state: { from: location }
                }}
            />)
            }
        />
    );
}

export default ProtectedRoute;