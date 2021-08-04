/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef } from 'react';
import { MessageProps } from '../components/Chat/Message';

const useMessage = () => {
    const messages = useRef<Map<string, MessageProps>>(new Map());
    const subscriptions = useRef<Map<string, string[]>>(new Map());

    const subscribeOnChat = (subscriberId: string, chatId: string) => {
        if (!subscriptions.current.has(chatId)) {
            subscriptions.current.set(chatId, []);
        }
        const subscriberByChats = subscriptions.current.get(chatId);

        if (!subscriberByChats.includes(subscriberId)) {
            subscriberByChats.push(subscriberId);
        }
    };

    const unSubscribeOnChat = (subscriberId: string, chatId?: string) => {
        if (chatId) {
            const subscriptionsByChat = subscriptions.current.get(chatId);
            if (subscriptionsByChat && subscriptionsByChat.includes(subscriberId)) {
                const index = subscriptionsByChat.findIndex((x) => x === subscriberId);
                subscriptionsByChat.slice(index, 1);
            }
        } else {
            for (const id in subscriptions.current.keys()) {
                const index = subscriptions.current.get(id).findIndex((x) => x === id);
                if (index > -1) {
                    subscriptions.current.get(id).slice(index, 1);
                }
            }
        }
    };
};
