import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../contexts/AuthContext';
import { useDictionary } from '../../contexts/DictionaryContext';
import signPicture from '../../../static/assets/images/pink-pink.jpg';
import './index.css';

interface IError {
    login: {
        virgin?: boolean;
        valid: boolean;
        message?: string;
    };
    pwd: {
        virgin?: true;
        valid: boolean;
        message?: string;
    };
}

const SignIn = () => {
    const { signIn, user } = useAuth();
    const [fetching, setFetching] = React.useState(false);
    const history = useHistory();
    const { d } = useDictionary();
    const [login, setLogin] = React.useState('');
    const [pwd, setPwd] = React.useState('');
    const [wrongData, setWrongData] = React.useState({
        hidden: true,
        message: d('Login or password is not correct'),
    });

    const [error, setError] = React.useState<IError>({
        login: {
            valid: false,
            virgin: true,
            message: d('Login is empty'),
        },
        pwd: {
            valid: false,
            virgin: true,
            message: d('Password should be at least 8 symbols or longer'),
        },
    });

    React.useEffect(() => {
        if (user) {
            history.push('/home');
        }
    }, [user]); //<== [user] - зависимости

    React.useEffect(() => {
        setError((x) => {
            return {
                ...x,
                login:
                    login.trim() == ''
                        ? {
                              valid: false,
                              virgin: x.login.virgin,
                              message: d('Login is empty'),
                          }
                        : { valid: true, virgin: error.login.virgin },
            };
        });
    }, [login]);

    React.useEffect(() => {
        setError((x) => {
            return {
                ...x,
                pwd:
                    pwd.length < 8
                        ? {
                              valid: false,
                              virgin: x.pwd.virgin,
                              message: d('Password should be at least 8 symbols or longer'),
                          }
                        : { valid: true, virgin: error.pwd.virgin },
            };
        });
    }, [pwd]);

    return (
        <div className="signIn-container">
            <form>
                <h1 className="header">Log in</h1>
                <img src={signPicture} />
                <div className="loginform">
                    <Input
                        key="input-login"
                        message={d(error.login.message)}
                        valid={error.login.virgin || error.login.valid}
                        type={'text'}
                        value={login}
                        placeholder={d('Enter your login')}
                        onChange={(e) => {
                            setLogin(e.replace(' ', '') as string);
                        }}
                        onBlur={() =>
                            setError((x) => {
                                const curLogin = x.login;
                                curLogin.virgin = undefined;
                                return { ...x, login: curLogin };
                            })
                        }
                    ></Input>
                    <Input
                        key="input-pwd"
                        message={d(error.pwd.message)}
                        valid={error.pwd.virgin || error.pwd.valid}
                        type={'password'}
                        value={pwd}
                        placeholder={d('Enter your password')}
                        onChange={(e) => {
                            setPwd(e.replace(' ', '') as string);
                        }}
                        onBlur={() =>
                            setError((x) => {
                                const curPwd = x.pwd;
                                curPwd.virgin = undefined;
                                return { ...x, pwd: curPwd };
                            })
                        }
                    ></Input>
                </div>
                <Button
                    disabled={!error.login.valid || !error.pwd.valid}
                    level="accent"
                    isFetching={fetching}
                    onClick={async () => {
                        setFetching(true);
                        const isAuth = await signIn(login, pwd);
                        setFetching(false);
                        if (!isAuth) {
                            setWrongData((x) => {
                                return { ...x, hidden: false };
                            });
                        }
                    }}
                >
                    {' '}
                    {d('Send')}
                </Button>
                <span className="WrongData" hidden={wrongData.hidden}>
                    {d(wrongData.message)}
                </span>
            </form>
        </div>
    );
};

export default SignIn;

