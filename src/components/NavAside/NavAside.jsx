import NavAsideStyles from './NavAside.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signOut } from '../../services/actions/usersActions'
import PropTypes from 'prop-types';



function NavAside({ text }) {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.userReducer.isAuthenticated)

    const logOut = () => {
        dispatch(signOut())
        localStorage.removeItem("persist:root")
    }

    return (
        <>
            <ul className={NavAsideStyles.list}>
                <li className={NavAsideStyles.list_item}>
                    <NavLink
                        to={{ pathname: `/profile` }}
                        className={`${NavAsideStyles.link} text text_type_main-medium text_color_inactive`}
                        activeClassName={NavAsideStyles.link_active}
                        exact={true}
                    >Профиль
                    </NavLink>
                </li>
                <li className={NavAsideStyles.list_item}>
                    <NavLink
                        className={`${NavAsideStyles.link} text text_type_main-medium text_color_inactive`}
                        to={{ pathname: `/profile/orders` }}
                        exact={true}
                        activeClassName={NavAsideStyles.link_active}
                    > История заказов
                    </NavLink>
                </li>
                <li className={NavAsideStyles.list_item}>
                    <NavLink
                        className={`${NavAsideStyles.link} text text_type_main-medium text_color_inactive`}
                        to={!auth ? { pathname: `/login` } : { pathname: `` }}
                        exact={true}
                        activeClassName={NavAsideStyles.link_active}
                        onClick={logOut}
                    > Выход
                    </NavLink>
                </li>
                <li className={`${NavAsideStyles.text} text text_type_main-default text_color_inactive`}>
                    {text}</li>
            </ul>
        </>

    )

}

export default NavAside;

NavAside.propTypes = {
    text: PropTypes.string.isRequired,
}