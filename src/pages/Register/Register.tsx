import React, { FormEventHandler } from 'react';
import RegisterStyles from './Register.module.css';
import { useSelector, useDispatch } from '../../services/hooks/hooks';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { registerNewUser } from '../../services/actions/usersActions'


function Register() {

    const auth = useSelector(state => state.userReducer.isAuthenticated)
    const dispatch = useDispatch()
    const history = useHistory<{ from: string }>();
    const [form, setValue] = React.useState({ email: '', password: '', user: '' });

    const onChange: FormEventHandler<HTMLInputElement> | undefined = (e) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement
        setValue({ ...form, [target.name]: target.value });
    }

    if (auth) {
        return (
            <Redirect
                to={history.location.state?.from || '/'}
            />
        );
    }

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        dispatch(registerNewUser(form.email, form.password, form.user))
    }


    return (

        <main className={RegisterStyles.main}>
            <div className={RegisterStyles.container}>
                <h2 className="text text_type_main-medium mb-5">Регистрация</h2>
                <form onSubmit={onSubmit} className={RegisterStyles.form}>
                    <div className='mb-5 pb-1'>
                        <Input
                            placeholder={'Имя'}
                            name={'user'}
                            onChange={onChange}
                            value={form.user}
                        />
                    </div>
                    <div className='mb-5 pb-1'>
                        <EmailInput
                            name={'email'}
                            onChange={onChange}
                            value={form.email} />
                    </div>
                    <div className={`${RegisterStyles.input} mb-5 pb-1`}>
                        <PasswordInput
                            name={'password'}
                            onChange={onChange}
                            value={form.password} />
                    </div>
                    <Button
                        type="primary"
                        size="medium"
                        htmlType={'submit'}>
                        Зарегистрироваться
                    </Button>
                </form>

                <div className={RegisterStyles.text}>
                    <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
                    <Link to='/login' className={`${RegisterStyles.link} text text_type_main-default`}>Войти</Link>
                </div>
            </div>

        </main>
    )
}

export default Register;