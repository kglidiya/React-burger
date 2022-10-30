import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


export function ProtectedRoute({ children, ...rest }) {
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