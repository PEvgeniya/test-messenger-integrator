import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Обертка над Route.
 * Проверяет, что пользователь авторизован на сайт.
 * Если проверка выполнена, то пользователь допускается на Роутер, переданный в пропсках.
 * Если нет, то пользователь переадресуется на страницу по умолчанию для авторизации.
 * @param props Роутинг в случае успешной авторизации
 */
const ProtectedRoute = (props: RouteProps) => {
    const { user } = useAuth();
    if (!user) {
        return <Redirect to="/signin"></Redirect>;
    }
    return <Route {...props} />;
};

export default ProtectedRoute;
