import React from 'react';
import ResetPasswordStyles from './ResetPassword.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {  changePassword } from '../../../services/actions/usersActions'
import { setInputWidth } from '../../../utils/inputs'

function ResetPassword() {
    React.useEffect(() => {
        setInputWidth()
    }, [])

    const dispatch = useDispatch()
    const history = useHistory();
    const auth = useSelector(state => state.userReducer.isAuthenticated)

    const [form, setValue] = React.useState({ newPassword: '', code: '' });

    const onChange = e => {
        e.preventDefault();
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();
        dispatch(changePassword(form.newPassword, form.code))
        history.replace({pathname: '/login'})
    }

    if (auth) {
        return (
            <Redirect
                to={history.location.state?.from || '/'}
            />
        );
    }

    return (

        <main className={ResetPasswordStyles.main}>
            <div className={ResetPasswordStyles.container}>
                <h2 className="text text_type_main-medium mb-5">Восстановление пароля</h2>
                <form onSubmit={onSubmit} className={ResetPasswordStyles.form}>
                    <div className='mb-5'>
                        <div className={`${ResetPasswordStyles.input} mb-5 pb-1`}>
                            <Input
                                name={'newPassword'}
                                onChange={onChange}
                                value={form.newPassword}
                                placeholder={'Введите новый пароль'}
                                icon={'ShowIcon'}
                            />
                        </div>
                        <div className={`${ResetPasswordStyles.input} mb-5 pb-1`}>
                            <Input
                                name={'code'}
                                onChange={onChange}
                                value={form.code}
                                placeholder={'Введите код из письма'}
                            />
                        </div>
                    </div>
                    <Button type="primary" size="medium" onClick={onSubmit}>Сохранить</Button>
                </form>

                <div className={ResetPasswordStyles.text}>
                    <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                    <Link to='/login' className={`${ResetPasswordStyles.link} text text_type_main-default`}>Войти</Link>
                </div>
            </div>

        </main>
    )
}

export default ResetPassword;