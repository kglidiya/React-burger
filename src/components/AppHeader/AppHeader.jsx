import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavLink from './NavLink/NavLink';
import headerStyles from './Header.module.css';
import { useLocation, useHistory, useParams } from 'react-router-dom';


function AppHeader() {
    const { pathname } = useLocation()
    const history = useHistory()
    const onClick = () => {
        history.replace({ pathname: '/' })
    }
    const id = useParams()


    return (
        <header className={headerStyles.header}>
            <nav className={headerStyles.content}>
                <ul className={headerStyles.container}>

                    <NavLink
                        to={{ pathname: `/` }}
                        active={pathname === "/"}
                        iconPrimary={<BurgerIcon type="primary" />}
                        iconSecondary={<BurgerIcon type="secondary" />}
                    > Конструктор </NavLink>

                    <NavLink
                        to={{ pathname: `/feed` }}
                        active={pathname === '/feed'}
                        iconPrimary={<ListIcon type="primary" />}
                        iconSecondary={<ListIcon type="secondary" />}
                    > Лента заказов</NavLink>

                    <div onClick={onClick} className={headerStyles.logo}><Logo /></div>

                    <NavLink
                        to={{ pathname: `/profile` }}
                        active={pathname === '/profile' || pathname === `/profile/orders/${id}` || pathname === '/profile/orders'}
                        iconPrimary={<ProfileIcon type="primary" />}
                        iconSecondary={<ProfileIcon type="secondary" />}
                    >Личный кабинет</NavLink>

                </ul>
            </nav>
        </header>
    )
}


export default AppHeader;
