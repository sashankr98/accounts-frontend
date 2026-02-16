import { Button, Card, DatePicker, Flex, Form, Input, InputNumber, Select, Statistic, Table, Typography } from "antd";
import { useTransactions } from "../hooks/useData";
import type { InputComponent, InputType, Transaction } from "../utils/Types";
import { useForm } from "antd/es/form/Form";
import { dollarAmountFormatter } from "../utils/Utils";
import { PlusCircleFilled, PlusOutlined } from "@ant-design/icons";

export function Transactions() {
    const [transactions, addTransaction, refreshTransactions, loading, error] = useTransactions();
    // eslint-disable-next-line react-hooks/purity
    const date = Date.now();

    const data: Transaction[] = transactions.length > 0 ? transactions : [
        { id: 1, date, description: "Work paycheck", category: "Paycheck", incomeAccount: "CO Checking", incomeAmount: 3921.74 },
        { id: 2, date, description: "Moto Ramen", category: "Restaurents", expenseAccount: "Quicksilver", expenseAmount: 64.58 },
        { id: 3, date, description: "Quicksilver bill", category: "Transfer", expenseAccount: "CO Checking", expenseAmount: 1309.32, incomeAccount: "Quicksilver", incomeAmount: 1309.32 },
    ]

    return (
        <>
            <Flex vertical align="center" gap="large">
                <Table<Transaction>
                    dataSource={data}
                    pagination={false}
                    rowKey={"id"}
                    bordered
                    title={() => <TransactionInput onSubmit={addTransaction} />}
                    styles={{
                        title: {
                            border: "1px solid #303030",
                            borderRadius: "8px",
                            marginBottom: "16px",
                        }
                    }}
                >
                {/* TODO: Fix gutter colour */}
                    <Table.Column
                        title="Date"
                        dataIndex="date"
                        render={date => new Date(date).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}
                    />
                    <Table.Column title="Description" dataIndex="description" width={300} />
                    <Table.Column title="Category" dataIndex="category" />
                    <Table.ColumnGroup title="Expense">
                        <Table.Column title="Account" dataIndex="expenseAccount" />
                        <Table.Column
                            title="Amount"
                            dataIndex="expenseAmount"
                            align="end"
                            render={(value) => {
                                if (!value) return undefined;
                                return (
                                    <Statistic
                                        value={value}
                                        precision={2}
                                        prefix={"$"}
                                        styles={{ content: { fontSize: "14px" } }}
                                    />
                                )
                            }}
                        />
                    </Table.ColumnGroup>
                    <Table.ColumnGroup title="Income" >
                        <Table.Column title="Account" dataIndex="incomeAccount" />
                        <Table.Column
                            title="Amount"
                            dataIndex="incomeAmount"
                            align="end"
                            render={(value) => {
                                if (!value) return undefined;
                                return (
                                    <Statistic
                                        value={value}
                                        precision={2}
                                        prefix={"$"}
                                        styles={{ content: { fontSize: "14px" } }}
                                    />
                                )
                            }}
                        />

                    </Table.ColumnGroup>
                </Table>
            </Flex>
        </>
    );
};

const TransactionInput: InputComponent<Transaction> = ({ onSubmit }) => {
    const [form] = useForm();
    return (
        <>
            <Form<InputType<Transaction>>
                form={form}
                name="TransactionInput"
                layout="inline"
                onFinish={(value) => {
                    onSubmit(value)
                        .then(() => form.resetFields());
                }}
            >
                {/* TODO: Update input widths */}
                {/* TODO: Update input widths */}
                <Form.Item name="date" rules={[{ required: true }]}>
                    <DatePicker format={"MMM DD, YYYY"}/>
                </Form.Item>
                <Form.Item name="description" rules={[{ required: true }]}>
                    <Input placeholder="Description" />
                </Form.Item>
                {/* TODO: Use categories in dropdown */}
                <Form.Item name="category" rules={[{ required: true }]}>
                    <Select placeholder="Category" options={[{ value: "Paycheck", label: "Paycheck" }, { value: "Restaurants", label: "Restaurants" }]} />
                </Form.Item>
                {/* TODO: Use accounts in dropdown */}
                <Form.Item name="expenseAccount">
                    <Select placeholder="Account" options={[{ value: "Quicksilver", label: "Quicksilver" }, { value: "CO Checking", label: "CO Checking" }]} />
                </Form.Item>
                {/* TODO: Validate that expense and/or income is provided */}
                <Form.Item name="expenseAmount">
                    <InputNumber<number>
                        prefix="$"
                        styles={{
                            root: { width: "100%" },
                            actions: { display: "none" },
                        }}

                        precision={2}
                        formatter={(value) => {
                            if (value !== undefined) {
                                return dollarAmountFormatter(value);
                            }
                            return "";
                        }}
                    />
                </Form.Item>
                <Form.Item name="incomeAccount">
                    <Select placeholder="Account" options={[{ value: "Quicksilver", label: "Quicksilver" }, { value: "CO Checking", label: "CO Checking" }]} />
                </Form.Item>
                <Form.Item name="incomeAmount">
                    <InputNumber<number>
                        prefix="$"
                        styles={{
                            root: { width: "100%" },
                            actions: { display: "none" },
                        }}

                        precision={2}
                        formatter={(value) => {
                            if (value !== undefined) {
                                return dollarAmountFormatter(value);
                            }
                            return "";
                        }}
                    />
                </Form.Item>
                <Form.Item label={null}>
                    <Button
                        type="primary"
                        shape="circle"
                        htmlType="submit"
                        icon={<PlusOutlined/>}
                        onClick={() => form.submit()}
                    />
                </Form.Item>
            </Form>
        </>
    );
};

