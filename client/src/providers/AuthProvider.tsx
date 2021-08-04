import { authContext, IAuthContextValue, IUser } from '../contexts/AuthContext';
import React, { useState } from 'react';
import { deleteAllCookies } from '../utils/cookie';
import { ChatClient } from '../services/ChatClient';
import { useDictionary } from '../contexts/DictionaryContext';

export default function AuthProvider(props: React.PropsWithChildren<unknown>) {
    const auth = useAuth();

    return <authContext.Provider value={auth}>{props.children}</authContext.Provider>;
}

const useAuth = (): IAuthContextValue => {
    const [user, setUser] = useState<IUser>(null);
    const { setLanguage } = useDictionary();
    //TODO: В будущем будет необходимо определять также и организацию пользователя
    const client = new ChatClient('https://_________');

    const signIn = async (login: string, pwd: string) => {
        // Имитация обращения к серверу
        const response = await client.login(login, pwd);
        if (response && response.status === 'success') {
            const { me } = response.data;
            setLanguage(me.language);
            setUser({
                id: me.username,
                name: me.name,
                email: me.email,
                login: me.username,
                avatarUrl: me.avatarUrl,
            });
            return true;
        }
        return false;
    };

    const signOut = async () => {
        await client.logOut();
        deleteAllCookies();
        setUser(null);
    };

    const checkUser = async () => {
        const me = await client.me();
        if (me) {
            setLanguage(me.language);
            setUser({
                id: me.username,
                name: me.name,
                email: me.email,
                login: me.username,
                avatarUrl: me.avatarUrl,
            });
        }
        return me != null;
    };

    // Здесь должно вернуться все, что требует того IAuthContextValue
    return {
        user,
        signIn,
        signOut,
        checkUser, // Возвращаем как результат выполнения функции
    };
};
