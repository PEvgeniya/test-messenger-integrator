import React, { useState } from 'react';
import './index.css';
import { IChatRoom, useChat } from '../../contexts/ChatContext';
import List from '../../components/List';
import Chat from '../Chat';
import Navbar, { MenuBar } from '../../components/Navbar';
import { matchPath, Route, useHistory, useParams } from 'react-router-dom';
import ProfileMenu from '../ProfileMenu';
//import { useDictionary } from '../../contexts/DictionaryContext';
//import Button from '../../components/Button';

const Home = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    const { chatRooms, loadChats } = useChat();
    // Не надо при каждом ререндеринге вызывать метод loadChats,
    // Это нужно сделать при первом запуске home
    // В дальнейшем обновлять при изменениях, которые
    // могут быть либо на форме, либо на серваке происходить
    React.useEffect(() => {
        if (chatRooms) {
            setIsLoading(false);
        }
    }, [chatRooms]);

    const match = matchPath<{ chatId: string }>(history.location.pathname, {
        path: '/home/chats/:chatId',
    });

    React.useEffect(() => {
        loadChats();
    }, []);

    const menuBars: MenuBar[] = [
        {
            name: 'Chat',
            action: () => {
                history.push('/bla-bla/');
            },
        },
        {
            name: 'Chat2',
            action: () => {
                history.push('/Chats');
            },
        },
    ];

    return (
        <div className="page-container">
            <Navbar menuBars={menuBars} commandBars={<ProfileMenu />} height="50px" />
            
            <div className="container home">
                <div className="chat-list">
                    <h1 className="chat-list-header">Cat chats</h1>
                    <input className="search" placeholder="Search"></input>
                    <List<IChatRoom>
                        selectedId={match?.params?.chatId}
                        isLoading={isLoading}
                        renderLoading={{
                            rowsLimit: 10,
                            renderRow: function Shimmer(key: string) {
                                return <div className="row-shimmer animate" key={key} />;
                            },
                        }}
                        values={chatRooms}
                    
                        onSelect={(chat) => {
                            history.push(`/home/chats/${chat._id}`);
                        }}
                        renderRow={(u) => {
                            return <div>{u.fname}</div>;
                        }}
                        getKey={(u) => {
                            return u._id;
                        }}
                    ></List>
                    <Route path="/home/chats/:chatId" component={Chat}></Route>
                </div>
            </div>
        </div>
    );
};

export default Home;
