import React from 'react';
import './index.css';

interface DropdownProps<T> {
    values: T[];
    renderRow: (value: T) => React.ReactElement;
    getKey?: (value: T) => string;
    className?: string;
    onClick?: (value: T) => void;
    isOpen: boolean;
}

export default function Dropdown<T>(props: DropdownProps<T>) {
    const { values, renderRow, getKey, className, onClick, isOpen } = props;

    const _getKey = (x: T, ind: number) => {
        if (getKey) {
            return getKey(x);
        }
        return ind;
    };

    return (
        <div className="cat-dropdown">
            {isOpen ? (
                (values ?? []).map((x, ind) => (
                    <div key={_getKey(x, ind)} className={className} onClick={() => onClick(x)}>
                        {renderRow(x)}
                    </div>
                ))
            ) : (
                <React.Fragment />
            )}
        </div>
    );
}
