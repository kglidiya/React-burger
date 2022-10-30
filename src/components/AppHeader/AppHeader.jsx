import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavLink from './NavLink/NavLink';
import headerStyles from './Header.module.css';
import { useLocation } from 'react-router-dom';


function AppHeader() {
    const { pathname } = useLocation()

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
                        to={{ pathname: `/profile/orders` }}
                       active={pathname === '/profile/orders'}
                        iconPrimary={<ListIcon type="primary" />}
                        iconSecondary={<ListIcon type="secondary" />}
                    > Лента заказов</NavLink>

                    <Logo />

                    <NavLink
                        to={{ pathname: `/profile` }}
                        active={pathname === '/profile' || pathname === '/profile/orders/:id'}
                        iconPrimary={<ProfileIcon type="primary" />}
                        iconSecondary={<ProfileIcon type="secondary" />}
                    >Личный кабинет</NavLink>

                </ul>
            </nav>
        </header>
    )
}


export default AppHeader;
