import { createContext, useContext } from 'react';

export interface IChatContextValue {
    chatRooms: IChatRoom[];
    loadChats: () => Promise<void>;
}

export const chatContext = createContext<IChatContextValue>({
    chatRooms: [],
    loadChats: async () => null,
});

export const useChat = () => {
    return useContext<IChatContextValue>(chatContext);
};

export interface IChatRoom {
    //ID of chat room
    _id: string;
    //Name of chat room
    fname: string;
    lastMessage: {
        ts: Date;
        msg: string;
        sender: string;
        fromMe: boolean;
    };
    ts: Date;
}
