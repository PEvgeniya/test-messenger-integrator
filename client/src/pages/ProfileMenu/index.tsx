import React, { useState } from 'react';
import Dropdown from '../../components/Dropdown';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import mockAvatar from '../../../static/assets/images/cat-icon-dark.jpg';
import './index.css';

interface ProfileMenuBar {
    name: string;
    action: (value?: string) => void;
}

export default function ProfileMenu() {
    const { signOut, user } = useAuth();
    const history = useHistory();
    const [isOpen, setOpen] = useState(false);

    const profileMenuBars: ProfileMenuBar[] = [
        {
            name: 'Profile',
            action: () => {
                history.push('/Profile');
            },
        },
        {
            name: 'Settings',
            action: () => {
                history.push('/Settings');
            },
        },
        {
            name: 'Sign out',
            action: () => {
                signOut();
            },
        },
    ];

    return (
        <div className="profile-Menu">
            <button className="profile-Menu-button" onClick={() => setOpen(!isOpen)}>
                <img src={user?.avatarUrl ?? mockAvatar} />
            </button>
            {isOpen ? (
                <div className="profileMenu-dropdown">
                    <Dropdown
                        isOpen={isOpen}
                        values={profileMenuBars}
                        className="ProfileMenuBar-item"
                        onClick={(x) => x.action()}
                        renderRow={(x) => {
                            return <div>{x.name}</div>;
                        }}
                    ></Dropdown>
                </div>
            ) : (
                React.Fragment
            )}
        </div>
    );
}
