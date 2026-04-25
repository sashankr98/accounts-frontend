import { For } from 'solid-js';

export type TableColumnProps<T> = {
    [K in keyof T]: {
        key: K;
        label: string;
        format?: (value: T[K]) => string;
        /** By default cell text does not wrap.
         * If set to true, wrapping is enabled
         * but a min-width is set to prevent over-wrapping
         */
        wrap?: boolean;
    }
}[keyof T];


export type TableProps<T> = {
    columns: TableColumnProps<T>[];
    data: Array<T>;
}

export default function Table<T>(props: TableProps<T>) {
    const columns = () => props.columns;
    const data = () => props.data;

    return (
        <div class='
            w-full
            mt-12
            overflow-auto
        '>
            <table class='
                table-auto w-full
                text-left 
                border-separate border-spacing-0
            '>
                <thead>
                    <tr class='
                    bg-zinc-600/50
                    '>
                        <For each={columns()}>
                            { column => 
                                <th class={`
                                    p-4 whitespace-nowrap
                                    border-b border-b-pink-500
                                    last:border-e-0
                                    first:rounded-tl-2xl
                                    last:rounded-tr-2xl
                                `}> 
                                    {column.label}
                                </th>
                            }
                        </For>
                    </tr>
                </thead>
                <tbody class='
                    [&_tr:last-child_td:first-child]:rounded-bl-2xl
                    [&_tr:last-child_td:last-child]:rounded-br-2xl
                    [&_tr:last-child_td]:border-b
                    [&_tr:nth-child(odd)_td]:bg-gray-800
                    [&_tr:nth-child(even)_td]:bg-gray-600/50
                '>
                    <For each={data()}>
                        {
                            entry => 
                            // TODO: Click to view/edit tx
                            <tr>
                                <For each={columns()}>
                                    {
                                        column => {
                                            const value = entry[column.key];
                                            const defaultValue = value ?? '';
                                            const displayedValue = column.format
                                                ? column.format(value)
                                                : String(defaultValue);
                                            return <td class={`
                                                p-4
                                                border-x border-zinc-600
                                                ${column.wrap ? 'min-w-48' : 'whitespace-nowrap' }
                                            `}>
                                                {displayedValue}
                                            </td>;
                                        }
                                    }
                                </For>
                            </tr>
                        }
                    </For>
                </tbody>
            </table>
        </div>
    );
}
