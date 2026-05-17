import Page from '@/components/Page';
import Table, { type TableColumnProps } from '@/components/Table';
import { DataFormatter } from '@/utils/DataFormatter';
import { mockAccountData } from '@/utils/MockData';
import type { Account } from '@/utils/Types';

const AccountTableColumns: TableColumnProps<Account>[] = [
    {
        key: 'name',
        label: 'Name',
    },
    {
        key: 'currentAmount',
        label: 'Current Amount',
        format: ({
            initialAmount,
            currentAmount,
        }) => DataFormatter.formatCurrencyValue(currentAmount ?? initialAmount),
    },
];

export default function Accounts() {
    return (
        <Page title='Accounts'>
            <Table columns={AccountTableColumns} data={mockAccountData}/>
        </Page>
    );
}
