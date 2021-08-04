import React from 'react';
import './index.css';
import Spinner from '../Spinner';

interface ListProps<T> {
    values: T[];
    renderRow: (value: T) => React.ReactElement;
    getKey?: (value: T) => string;
    onSelect: (value: T) => void;
    className?: string;
    isLoading?: boolean;
    selectedId?: string;
    renderLoading?: {
        renderRow: (key: string | number) => React.ReactElement;
        rowsLimit?: number;
    };
}

/**
 * Generic нужно задать таким образом
 * @param props
 * @returns
 */
export default function List<T>(props: ListProps<T>) {
    const { getKey, renderRow, values, onSelect, selectedId, isLoading, renderLoading } = props;

    /**
     * Обёртка над getKey - если метод не определен, то будет
     * использоваться индекс элемент
     * @param x Элемент
     * @param ind Индекс элемента в массиве
     * @returns ключ
     */
    const _getKey = (x: T, ind: number) => {
        if (getKey) {
            return getKey(x);
        }
        return ind;
    };

    return (
        <div className="cat-list-container">
            {isLoading && renderLoading == null ? (
                <Spinner />
            ) : isLoading && renderLoading != null ? (
                Array(renderLoading.rowsLimit ?? 1)
                    .fill(0)
                    .map((item, index) => renderLoading.renderRow(index))
            ) : (
                (values ?? []).map((x, ind) => (
                    <div
                        key={_getKey(x, ind)}
                        className={
                            _getKey(x, ind) === selectedId ? 'list-raw-container selected' : 'list-raw-container'
                        }
                        onClick={() => onSelect(x)}
                    >
                        {renderRow(x)}
                    </div>
                ))
            )}
        </div>
    );
}
