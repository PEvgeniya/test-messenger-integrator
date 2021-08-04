import * as React from 'react';
import './index.css';

interface InputProps {
    valid?: boolean;
    type?: 'password' | 'text';
    placeholder?: string;
    value: string;
    onChange?: (value?: string) => void;
    onBlur?: (value?: string) => void;
    onSubmit?: (value?: string) => void;
    message?: string;
}

export default function Input(props: InputProps) {
    const { valid = true, type, placeholder, value, onChange, onBlur, onSubmit, message } = props;
    return (
        <div className="cat-input-container">
            <input
                type={type}
                className={valid ? 'form-control' : 'error'}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.currentTarget.value)}
                onBlur={(e) => onBlur(e.currentTarget.value)}
                onSubmit={(e) => onSubmit(e.currentTarget.value)}
            />
            <InputHelper hidden={valid} message={message}></InputHelper>
        </div>
    );
}

function InputHelper(props: { hidden: boolean; message: string }) {
    return (
        <label style={{ visibility: props.hidden ? 'hidden' : 'visible' }} className="error-alert">
            {!props.message || props.message.length === 0 ? 'hidden' : props.message}
        </label>
    );
}
