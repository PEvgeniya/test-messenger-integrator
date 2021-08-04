import * as React from 'react';
import './index.css';

interface ButtonProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    level?: 'primary' | 'secondary' | 'warning' | 'ghost' | 'accent';
    isFetching?: boolean;
}

const Button = (props: ButtonProps) => {
    const { level, className, isFetching } = props;
    let specialClass = level != null ? `${level} ${className}` : `primary ${className}`;
    if (isFetching) {
        specialClass += ` fetching`;
    }
    return (
        <div className="cat-button">
            <button
                {...props}
                disabled={props.isFetching || props.disabled}
                className={specialClass}
                onClick={(e) => {
                    // Делаю обёртку над кнопкой
                    // Потому после нажатия на неё происход`ит перезагрузка страницы
                    // Если она внутри <form/>
                    e.preventDefault(); // Вызов этой функции предотвращает обновление
                    props.onClick(e); // Дальше передаём event кнопке
                }}
            >
                {props.children}
            </button>
        </div>
    );
};

export default Button;
