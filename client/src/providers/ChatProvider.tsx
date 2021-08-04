import { chatContext, IChatContextValue, IChatRoom } from '../contexts/ChatContext';
import React, { useState } from 'react';
import { ChatClient } from '../services/ChatClient';

export default function ChatProvider(props: React.PropsWithChildren<unknown>) {
    const chat = useChat();

    return <chatContext.Provider value={chat}>{props.children}</chatContext.Provider>;
}

const client = new ChatClient('https://__________');

const useChat = (): IChatContextValue => {
    const [chatRooms, setChatRooms] = useState<IChatRoom[]>();
    const loadChats = async () => {
        const rooms = (await client.getRooms()) as { rooms: IChatRoom[] };
        setChatRooms(
            rooms.rooms.sort((a, b) => {
                return new Date(a.ts) > new Date(b.ts) ? 1 : -1;
            }),
        );
    };

    return {
        chatRooms,
        loadChats,
    };
};
