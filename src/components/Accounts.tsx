import { Button, Flex, InputNumber, Statistic, Table, Typography, type InputNumberProps } from "antd";
import { useState } from "react";
import type { Account } from "../utils/Types";
import { red } from "@ant-design/colors";

const dollarAmountFormatter: InputNumberProps<number>["formatter"] = (value) => {
    const [start, end] = `${value}`.split(".") || [];
    const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${end ? `${v}.${end}` : `${v}`}`;
}

function AmountComparizon(props: { currentAmount: number }) {
    const [actualAmount, setActualAmount] = useState<number | null>(null);
    const unaccountedValue: number = actualAmount ? actualAmount - props.currentAmount : 0;
    const color = unaccountedValue !== 0 ? red[6] : "white";

    return (
        <>
            <Flex
                align="center"
                justify="flex-start"
                gap="large"
            >
                <InputNumber
                    prefix="$"
                    size="large"
                    style={{ minWidth: "120px" }}
                    styles={{ actions: { display: "none" } }}
                    precision={2}
                    formatter={dollarAmountFormatter}
                    onChange={setActualAmount}
                />
                <Statistic
                    title={"Unaccounted"}
                    value={unaccountedValue}
                    prefix={"$"}
                    precision={2}
                    styles={{
                        prefix: { color },
                        content: { color },
                    }}
                />
            </Flex>
        </>
    )
}

export function Accounts() {
    const [accounts, setAccounts] = useState<Account[]>([
        { name: "Sashank Splitwise", initialAmount: 0, currentAmount: 2147.32 },
        { name: "Venture X", initialAmount: 0, currentAmount: -232.21 },
    ]);

    /* TODO 1. Fetch accounts
     * 2. Add new accounts
     * 3. When account values are mismatched, make it easy to add transactions and view the mismatch at the same time
    */

    return (
        <>
            <Typography.Title level={2}>Accounts</Typography.Title>
            <Button type="primary">Add</Button>
            <Table<Account>
                dataSource={accounts}
                pagination={{ hideOnSinglePage: true }}
                rowKey={"name"}
                expandable={{
                    fixed: "right",
                    rowExpandable: () => true,
                    expandedRowRender: (record) => (<AmountComparizon currentAmount={record.currentAmount} />)
                }}
            >
                <Table.Column title="Name" dataIndex={"name"} />
                <Table.Column
                    hidden
                    title="Initial Amount"
                    dataIndex={"initialAmount"}
                    render={(value) => (
                        <Statistic
                            value={value}
                            precision={2}
                            prefix={"$"}
                        />
                    )}
                />
                <Table.Column
                    title="Current Amount"
                    dataIndex={"currentAmount"}
                    render={(value) => (
                        <Statistic
                            value={value}
                            precision={2}
                            prefix={"$"}
                        />
                    )}
                />
            </Table>
        </>
    );
}
