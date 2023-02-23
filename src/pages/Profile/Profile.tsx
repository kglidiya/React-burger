import React, { FormEventHandler } from 'react';
import ProfileStyles from './Profile.module.css';
import { useSelector, useDispatch } from '../../services/hooks/hooks';
import NavAside from '../../components/NavAside/NavAside';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { editUserDetails, getUserDetails } from '../../services/actions/usersActions'


function Profile() {
    const user = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const password = user.password;

    React.useEffect(() => {
        dispatch(getUserDetails(password))
    }, [dispatch, password])

    const [form, setValue] = React.useState({ name: user.userName, email: user.email, password: user.password });

    const [isChanged, setIsChanged] = React.useState(false)

    const onChange: FormEventHandler<HTMLInputElement> | undefined = (e) => {
        const target = e.target as HTMLInputElement
        setIsChanged(true)
        setValue({ ...form, [target.name]: target.value });
    }

    function cancelChanges() {
        setValue({ name: user.userName, email: user.email, password: user.password })
        setIsChanged(false)
    }

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setTimeout(() => dispatch(editUserDetails(form.email, form.password, form.name)), 0)
        setIsChanged(false)
    }

    const inputRef = React.useRef<HTMLInputElement>(null);
    const onIconClick = () => {
        setTimeout(() => inputRef.current?.focus(), 0)
    }

    return (

        <main className={ProfileStyles.main}>
            <NavAside text={'В этом разделе вы можете изменить свои персональные данные'} />

            <div className={ProfileStyles.container}>

                <form onSubmit={onSubmit} className={ProfileStyles.form}>
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
                            htmlType={'submit'}>
                            Сохранить</Button>
                        <Button
                            type="primary"
                            size="medium"
                            onClick={cancelChanges}
                            htmlType={'submit'}
                        >Отмена</Button>

                    </div>}
                </form>

            </div>

        </main>
    )
}

export default Profile;