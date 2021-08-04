import * as React from 'react';

import './index.css';

export type MessageProps = IMessageFromMe | IMessage;

export interface IMessageFromMe {
    _: 'messageFromMe';
    id: string;
    body: string;
    avatar?: string;
    ts: Date;
    state: 'sent' | 'delivered' | 'read';
    edited?: boolean;
    me: true;
}

export interface IMessage extends Omit<IMessageFromMe, 'state' | '_' | 'me'> {
    _: 'message';
    state: 'read' | 'unread';
}

const Message = (props: MessageProps) => {
    return (
        <div key={props.id} className={`message-container ${props.state} ${props.me ? 'outgoing' : 'incoming'}`}>
            {props.body}
        </div>
    );
};

export default Message;
