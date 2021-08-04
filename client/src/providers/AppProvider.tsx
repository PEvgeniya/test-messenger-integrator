import React from 'react';

import AuthProvider from './AuthProvider';
import DictionaryProvider from './DictionaryProvider';
import ChatProvider from './ChatProvider';

type AppProviderProps = React.PropsWithChildren<unknown>;

// В этом месте происходит объявление всех провайдеров
// Порядок вложенности в основном может быть хаотичным
// Но если провайдер A зависит от другого контекста B,
// то провайдер A тогда должен быть
// вложенным в провайдер В, реализующий этот контекст
const AppProvider = (props: AppProviderProps) => {
    return (
        <DictionaryProvider>
            <AuthProvider>
                <ChatProvider>{props.children}</ChatProvider>
            </AuthProvider>
        </DictionaryProvider>
    );
};

export default AppProvider;
