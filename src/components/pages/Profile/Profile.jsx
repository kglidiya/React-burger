import React from 'react';
import ProfileStyles from './Profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { editUserDetails, getUserDetails, signOut, getNewToken } from '../../../services/actions/usersActions'
import { setInputWidth } from '../../../utils/inputs'
import { isTokenExpired } from '../../../utils/token'
import { getCookie } from "../../../utils/cookie";


function Profile() {
    const user = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const password = user.password
    const auth = useSelector(state => state.userReducer.isAuthenticated)
    const token = getCookie('token')

    function checkToken() {
        if (token === undefined) {
            dispatch(getNewToken())
        }
        if (token !== undefined) {
            const isExpired = isTokenExpired(token)
            if (isExpired) {
                dispatch(getNewToken())
            }
        }
    }

    React.useEffect(() => {
        setInputWidth()
        checkToken()
        setTimeout(() => dispatch(getUserDetails(password)), 0)
    }, [token])

    const [form, setValue] = React.useState({ name: user.userName, email: user.email, password: user.password });

    const [isChanged, setIsChanged] = React.useState(false)

    const onChange = e => {
        setIsChanged(true)
        setValue({ ...form, [e.target.name]: e.target.value });
    }

    function cancelChanges() {
        setValue({ name: user.userName, email: user.email, password: user.password })
        setIsChanged(false)
    }

    function onSubmit(e) {
        e.preventDefault();
        checkToken()
        setTimeout(() => dispatch(editUserDetails(form.email, form.password, form.name)), 0)
        setIsChanged(false)
    }

    const logOut = () => {
        dispatch(signOut())
        localStorage.removeItem("persist:root")
    }

    const inputRef = React.useRef();
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)

    }

    return (

        <main className={ProfileStyles.main}>
            <ul className={ProfileStyles.list}>
                <li className={ProfileStyles.list_item}>
                    <NavLink
                        to={{ pathname: `/profile` }}
                        className={`${ProfileStyles.link} text text_type_main-medium`}
                        activeClassName={ProfileStyles.link_active}
                        exact={true}
                    >Профиль
                    </NavLink>
                </li>
                <li className={ProfileStyles.list_item}>
                    <NavLink
                        className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive`}
                        to={{ pathname: `/profile/orders/:id` }}
                        exact={true}
                        activeClassName={ProfileStyles.link_active}
                    >
                        История заказов
                    </NavLink>
                </li>
                <li className={ProfileStyles.list_item}>
                    <NavLink
                        className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive`}
                        to={!auth ? { pathname: `/login` } : { pathname: `` }}
                        exact={true}
                        activeClassName={ProfileStyles.link_active}
                        onClick={logOut}
                    >
                        Выход
                    </NavLink>
                </li>
                <li className={`${ProfileStyles.text} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</li>
            </ul>

            <div className={ProfileStyles.container}>

                <form onSubmit={onSubmit}>
                    <div className='mb-5 pb-1'>

                        <Input
                            ref={inputRef}
                            placeholder={'Имя'}
                            name={'name'}
                            onChange={onChange}
                            value={form.name}
                            icon={'EditIcon'}
                            onIconClick={onIconClick}

                        />
                    </div>
                    <div className='mb-5 pb-1'>
                        <Input
                            ref={inputRef}
                            placeholder={'Логин'}
                            name={'email'}
                            onChange={onChange}
                            value={form.email}
                            icon={'EditIcon'}
                            onIconClick={onIconClick}
                        />
                    </div>
                    <div className={`${ProfileStyles.input} mb-5`}>
                        <Input
                            ref={inputRef}
                            placeholder={'Пароль'}
                            name={'password'}
                            onChange={onChange}
                            value={form.password}
                            icon={'EditIcon'}
                            type={'password'}
                            onIconClick={onIconClick}
                        />

                    </div>
                    {isChanged && <div className={ProfileStyles.buttons}>
                        <Button
                            type="primary"
                            size="medium"
                            onClick={onSubmit}
                        >Сохранить</Button>
                        <Button
                            type="primary"
                            size="medium"
                            onClick={cancelChanges}
                        >Отмена</Button>

                    </div>}
                </form>

            </div>

        </main>
    )
}

export default Profile;