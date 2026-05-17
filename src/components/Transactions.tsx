import Page from '@/components/Page';
import type { TableColumnProps } from '@/components/Table';
import Table from '@/components/Table';
import { DataFormatter } from '@/utils/DataFormatter';
import { mockTransactionData } from '@/utils/MockData';
import type { Transaction } from '@/utils/Types';

const TransactionTableColumns: TableColumnProps<Transaction>[] = [
    {
        key: 'date',
        label: 'Date',
        format: ({ date }) => DataFormatter.formatDate(date),
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
        format: ({ expenseAmount }) => DataFormatter.formatCurrencyValue(expenseAmount),
    },
    {
        key: 'incomeAccount',
        label: 'Income Account',
    },
    {
        key: 'incomeAmount',
        label: 'Income',
        format: ({ incomeAmount }) => DataFormatter.formatCurrencyValue(incomeAmount),
    },
];

export default function Transactions() {
    return (
        <Page title='Transactions'>
            <Table columns={TransactionTableColumns} data={mockTransactionData}/>
        </Page>
    );
}
