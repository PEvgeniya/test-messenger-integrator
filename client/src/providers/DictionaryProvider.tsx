import React, { useState } from 'react';

import { dictionaryContext, IDictionaryContextValue } from '../contexts/DictionaryContext';

export default function DictionaryProvider(props: React.PropsWithChildren<unknown>) {
    const dictionary = useDictionary();
    return <dictionaryContext.Provider value={dictionary}>{props.children}</dictionaryContext.Provider>;
}
// Реализация контекста словаря посредством загрузки json схем, которые хранятся в static
const useDictionary = (): IDictionaryContextValue => {
    const [languages] = React.useState({
        ru: require('../../static/dictionary/ru-RU.json'),
        de_DE: require('../../static/dictionary/de-DE.json'),
    });
    const [language, setLanguage] = useState<string>(navigator.language);
    const [dictionary, setDictionary] = useState<{ [key: string]: string }>(null);

    React.useEffect(() => {
        setLanguage(window.navigator.language);
    }, []);

    React.useEffect(() => {
        if (language === 'en_US') {
            setDictionary(null);
        } else {
            setDictionary(languages[language]);
        }
    }, [language]);

    const d = (code: string) => {
        return dictionary?.[code] ?? code;
    };

    return {
        d,
        setLanguage,
        lang: language,
        langs: ['en_US', 'ru', 'de_DE'],
    };
};
