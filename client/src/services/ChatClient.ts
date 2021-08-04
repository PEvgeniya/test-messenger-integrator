import { matchPath } from 'react-router';
import { getCookieValue, setCookie } from '../utils/cookie';
import { ILoginResponse, IMeResponse } from './ChatClient.types';


export class ChatClient {
    private apiUrl: string;
    /**
     * @param apiUrl 
     */
    constructor(apiUrl: string) {
        this.apiUrl = apiUrl.replace(/\/$/, ''); // Удаляем лишний /, если случайно прописан
    }

    loginHeaders = () => {
        return {
            'X-Auth-Token': getCookieValue('X-Auth-Token'),
            'X-User-Id': getCookieValue('X-User-Id'),
        };
    };

    /**
     * Авторизоваться 
     * @param mail Почта или логин
     * @param pwd Пароль
     * @returns Данные авторизации
     */
    login = async (mail: string, pwd: string) => {
        const response = await fetch(`${this.apiUrl}/api/__`, {
            method: 'POST',
            body: JSON.stringify({
                username: mail,
                password: pwd,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const login = (await response.json()) as ILoginResponse;
            const { userId, authToken } = login.data;
            login.data.me.avatarUrl = avatarProfileFix(login.data.me.avatarUrl);
            setCookie({ name: 'X-User-Id', value: userId, sameSite: 'strict' });
            setCookie({ name: 'X-Auth-Token', value: authToken, sameSite: 'strict' });
            return login;
        }
        return null;
    };

    me = async () => {
        const response = await fetch(`${this.apiUrl}/api/__`, {
            headers: this.loginHeaders(),
        });
        if (response.ok) {
            const me = (await response.json()) as IMeResponse;
            console.log(await this.getRooms());
            me.avatarUrl = avatarProfileFix(me.avatarUrl);
            console.log(me.avatarUrl);
            return me;
        }
        return null;
    };

    logOut = async () => {
        const response = await fetch(`${this.apiUrl}/api/__`, {
            headers: this.loginHeaders(),
        });
        return response.ok;
    };

    getChannels = async () => {
        const response = await fetch(`${this.apiUrl}/api/__`, {
            headers: this.loginHeaders(),
        });

        return response.json();
    };

    getRooms = async () => {
        const response = await fetch(`${this.apiUrl}/api/__`, {
            headers: this.loginHeaders(),
        });

        return response.json();
    };
}

function avatarProfileFix(url: string) {
    try {
        const match = matchPath<{ organizationId: string }>(url, {
            path: '*/:organizationId/avatar/*',
        });
        return `https://__/${match.params.organizationId}/avatar/${match.params[1]}`;
    } catch (ex) {
        return null;
    }
}
