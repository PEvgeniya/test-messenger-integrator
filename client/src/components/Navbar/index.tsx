import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';
import { useEventListener } from '../../utils/useEventListener';

export interface NavbarProps {
    logo?: {
        path: URL;
    };
    menuBars: MenuBar[]; // когда у тебя массив или список, то лучше подчеркнуть это в названии и указать множественное число
    commandBars: JSX.Element;
    height?: string;
    getKey?: (value) => string;
}
export interface MenuBar {
    name: string;
    action: (value?: string) => void;
}

export interface CommandBar {
    name: string;
    action: (value?: string) => void;
}

export default function Navbar(props: NavbarProps) {
    const { logo, menuBars, commandBars, height, getKey } = props;
    const [isLeftOpen, setLeftOpen] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    useEventListener('resize', () => {
        setIsMobile(window.innerWidth < 768);
    });

    const heightChange = document.documentElement;

    heightChange.style.setProperty('--height', height);

    const _getKey = (x, ind) => {
        if (getKey) {
            return getKey(x);
        }
        return ind;
    };

    return (
        <div className="cat-navbar">
            <NavLink to={logo?.path ?? ''} className="navbar-logo"></NavLink>
            {isMobile ? (
                isLeftOpen ? (
                    <div className="left-menu responsive">
                        <div className="left-hamb-open" onClick={() => setLeftOpen(!isLeftOpen)}>
                            ☰
                        </div>
                        <nav className="menuBar-nav responsive">
                            {menuBars.map((x, ind) => (
                                <div
                                    key={_getKey(x, ind)}
                                    className="menuBar-item responsive"
                                    onClick={() => x.action()}
                                >
                                    {x.name}
                                </div>
                            ))}
                        </nav>
                    </div>
                ) : (
                    <div className="left-hamb" onClick={() => setLeftOpen(!isLeftOpen)}>
                        ☰
                    </div>
                )
            ) : (
                <div className="left-menu">
                    <nav className="menuBar-nav">
                        {menuBars.map((x, ind) => (
                            <div key={_getKey(x, ind)} className="menuBar-item" onClick={() => x.action()}>
                                {x.name}
                            </div>
                        ))}
                    </nav>
                </div>
            )}

            <div className="right-menu">{commandBars}</div>
        </div>
    );
}
