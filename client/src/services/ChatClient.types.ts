export interface ILoginResponse {
    status: string;
    data: {
        me: IMeResponse;
        userId: string;
        authToken: string;
    };
}

export interface IMeResponse {
    active: boolean;
    avatarUrl: string;
    email: string;
    emails: { address: string; verified: boolean }[];
    language: 'ru' | 'en' | string;
    name: string;
    nickname: string;
    requirePasswordChange: boolean;
    roles: string[];
    settings: { [key: string]: string | boolean | number };
    status: 'away' | 'online';
    statusConnection: 'away' | 'online';
    statusLivechat: 'available' | string;
    username: string;
    utcOffset: number;
}
