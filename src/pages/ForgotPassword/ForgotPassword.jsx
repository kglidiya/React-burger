import ForgotPasswordStyes from './ForgotPassword.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword, sendResetEmail } from '../../services/actions/usersActions';


function ForgotPassword() {

 
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
  const dispatch = useDispatch()
  const userEmail = useSelector(state => state.userReducer.email)
  const history = useHistory();
  const auth = useSelector(state => state.userReducer.isAuthenticated)
  const onChange = e => {
    dispatch(resetPassword(e.target.value))
  }

  function redirect() {
    history.push(`/reset-password`, { from: 'forgot-password' } );
  }

  const onSubmit = e => {
    e.preventDefault();
    if (!re.test(userEmail)) {
      return
    }
    dispatch(sendResetEmail(userEmail, redirect))

  }

  if (auth) {
    return (
      <Redirect
        to={history.location.state?.from || '/'}
      />
    );
  }

  return (

    <main className={ForgotPasswordStyes.main}>
      <div className={ForgotPasswordStyes.container}>
        <h2 className="text text_type_main-medium mb-5">Восстановление пароля</h2>
        <form className={ForgotPasswordStyes.form} onSubmit={onSubmit}>
          <div className='mb-5 pb-1'>
            <Input
              placeholder={'Укажите e-mail'}
              name={'email'}
              onChange={onChange}
              value={userEmail}
            />
          </div>

          <Button
            type="primary"
            size="medium">
            Восстановить
          </Button>
        </form>

        <div className={ForgotPasswordStyes.text}>
          <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
          <Link to={'/login'} className={`${ForgotPasswordStyes.link} text text_type_main-default`}>Войти</Link>
        </div>
      </div>
    </main>
  )
}

export default ForgotPassword;