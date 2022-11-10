import React from 'react';
import ProfileStyles from './Profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import NavAside from '../../components/NavAside/NavAside';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { editUserDetails, getUserDetails, getNewToken } from '../../services/actions/usersActions'
import { isTokenExpired } from '../../utils/token'
import { getCookie} from "../../utils/cookie";


function Profile() {
    const user = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const password = user.password


    function checkToken() {
        let token = getCookie('token')
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
        checkToken()
        setTimeout(() => dispatch(getUserDetails(password)), 0)
    }, [])

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


    const inputRef = React.useRef();
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)

    }

    return (

        <main className={ProfileStyles.main}>
            <NavAside text={'В этом разделе вы можете изменить свои персональные данные'}/>
         
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