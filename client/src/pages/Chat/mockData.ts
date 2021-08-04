import { MessageProps } from '../../components/Chat/Message';

export const messages: MessageProps[] = [
    {
        _: 'message',
        body: 'Hi HUMAN',
        id: '________',
        state: 'read',
        ts: new Date(),
    },
    {
        _: 'messageFromMe',
        body: 'Hi ROBOT',
        id: '______',
        state: 'read',
        ts: new Date(),
        me: true,
    },
    {
        _: 'messageFromMe',
        body: 'Did you like to be alive?',
        id: 'ds',
        state: 'read',
        ts: new Date(),
        me: true,
    },
    {
        _: 'message',
        body: 'HUMAN, I never be alive.',
        id: 'lol',
        state: 'read',
        ts: new Date(),
    },
    {
        _: 'messageFromMe',
        body: 'LOL. Loser.',
        id: 'lol loser',
        state: 'sent',
        ts: new Date(),
        me: true,
    },
];
