import type { TableColumnProps } from '@/components/Table';
import Table from '@/components/Table';
import { mockTransactionData } from '@/utils/MockData';

export type Transaction = {
    id: number;
    date: number;
    description: string;
    category: string;
    expenseAccount?: string;
    expenseAmount?: number;
    incomeAccount?: string;
    incomeAmount?: number;
};

const dateFormat = Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
});

const amountFormatter = (value: number | undefined): string => {
    if (value === undefined) return '';
    return `$ ${value.toLocaleString()}`;
};

const TransactionTableColumns: TableColumnProps<Transaction>[] = [
    {
        key: 'date',
        label: 'Date',
        format: date => {
            return dateFormat.format(new Date(date));
        },
    },
    {
        key: 'description',
        label: 'Description',
        wrap: true,
    },
    {
        key: 'category',
        label: 'Category',
    },
    {
        key: 'expenseAccount',
        label: 'Expense Account',
    },
    {
        key: 'expenseAmount',
        label: 'Expense',
        format: amountFormatter,
    },
    {
        key: 'incomeAccount',
        label: 'Income Account',
    },
    {
        key: 'incomeAmount',
        label: 'Income',
        format: amountFormatter,
    },
];

export default function Transactions() {
    return (
        <div>
            <h1>
                Transactions
            </h1>
            <Table columns={TransactionTableColumns} data={mockTransactionData}/>
        </div>
    );
}
