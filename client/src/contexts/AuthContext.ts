import { createContext, useContext } from 'react';

/**
 * Контекст авторизации
 * Хранит логику авторизации пользователя, профиль,
 * и другие методы аутентификации, которые могут понадобиться
 */
export interface IAuthContextValue {
    /**
     * Пользователь и его данные
     */
    user: IUser;
    /**
     * Авторизоваться
     */
    signIn: (login: string, pwd: string) => Promise<boolean>;
    /**
     * Выйти
     */
    signOut: () => Promise<void>;
    /**
     * Проверить авторизацию пользователя
     * Я объявил новый контракт для IAuthContextValue
     * Это значит, что любов AuthProvider должен реализовывать этот метод
     */
    checkUser: () => Promise<boolean>;
}

// Здесь прописываются заглушки, чтобы TS не ругался на типы
export const authContext = createContext<IAuthContextValue>({
    user: null,
    signIn: async () => undefined,
    signOut: async () => undefined,
    checkUser: async () => undefined,
});

/**
 * Получить данные и методы авторизации
 */
export const useAuth = () => {
    return useContext<IAuthContextValue>(authContext);
};

export interface IUser {
    id: string;
    name: string;
    login: string;
    email: string;
    avatarUrl: string;
}
