import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavLink from './NavLink/NavLink';
import headerStyles from './Header.module.css'

function AppHeader() {
    const [current, setCurrent] = React.useState('one');
    return (
        <header className={headerStyles.header}>
            <nav className={headerStyles.content}>
                <ul className={headerStyles.container}>

                    <NavLink
                        value="one" active={current === 'one'} onClick={setCurrent}
                        iconPrimary={<BurgerIcon type="primary" />}
                        iconSecondary={<BurgerIcon type="secondary" />}
                    > Конструктор </NavLink>

                    <NavLink
                        value="two" active={current === 'two'} onClick={setCurrent}
                        iconPrimary={<ListIcon type="primary" />}
                        iconSecondary={<ListIcon type="secondary" />}
                    > Лента заказов</NavLink>

                    <Logo />

                    <NavLink
                        value="three" active={current === 'three'} onClick={setCurrent}
                        iconPrimary={<ProfileIcon type="primary" />}
                        iconSecondary={<ProfileIcon type="secondary" />}
                    >Личный кабинет</NavLink>

                </ul>
            </nav>
        </header>

    )
}


export default AppHeader;