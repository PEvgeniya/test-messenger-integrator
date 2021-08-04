import * as React from 'react';
import { useParams } from 'react-router';

const Chat = () => {
    const { chatId } = useParams<{ chatId: string }>();

    return <div>{chatId}</div>;

    // return (
    //     <div className="cat-chat-container" id={chat.rid}>
    //         <h2 className="chat-header">{chat.name}</h2>
    //         <div className="chat-container">
    //             {messages.map((msg) => {
    //                 return <Message key={msg.id} {...msg}></Message>;
    //             })}
    //         </div>
    //     </div>
    // );
};

export default Chat;
