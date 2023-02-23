import React, {FormEventHandler} from "react";
import LoginStyes from "./Login.module.css";
import { useSelector, useDispatch } from "../../services/hooks/hooks";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
    Input,
    PasswordInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { signIn } from "../../services/actions/usersActions";


function Login() {

    const history = useHistory<{ from: string }>();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.userReducer.isAuthenticated);
    const [form, setValue] = React.useState({ email: "", password: "" });

    const onChange:FormEventHandler<HTMLInputElement> | undefined = (e) => {
        const target = e.target as HTMLInputElement
        setValue({ ...form, [target.name]: target.value });
    };
 
    const login: FormEventHandler<HTMLFormElement> | undefined  = React.useCallback(
         (e: { preventDefault: () => void; }) => {
          e.preventDefault();
          dispatch(signIn(form.email, form.password));
        },
        [form, dispatch]
    );


    if (auth) {
        return <Redirect to={history.location.state?.from || "/"} />;
    }

    return (
        <main className={LoginStyes.main}>
            <div className={LoginStyes.container}>
                <h2 className="text text_type_main-medium mb-5">Вход</h2>
                <form className={LoginStyes.form} onSubmit={login}>
                    <div className="mb-5 pb-1">
                        <Input
                            placeholder={"E-mail"}
                            name={"email"}
                            onChange={onChange}
                            value={form.email}
                        />
                    </div>
                    <div className={`${LoginStyes.input} mb-5 pb-1`}>
                        <PasswordInput
                            name={"password"}
                            onChange={onChange}
                            value={form.password}
                        />
                    </div>
                    <Button 
                    type="primary" 
                    size="medium"
                    htmlType={'submit'}>
                        Войти
                    </Button>
                </form>

                <div className={LoginStyes.text}>
                    <p className="text text_type_main-default text_color_inactive">
                        Вы — новый пользователь?
                    </p>
                    <Link
                        to="/register"
                        className={`${LoginStyes.link} text text_type_main-default`}
                    >
                        Зарегистрироваться
                    </Link>
                </div>
                <div className={LoginStyes.text}>
                    <p className="text text_type_main-default text_color_inactive">
                        Забыли пароль?
                    </p>
                    <Link
                        to="/forgot-password"
                        className={`${LoginStyes.link} text text_type_main-default`}
                    >
                        Восстановить пароль
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default Login;
