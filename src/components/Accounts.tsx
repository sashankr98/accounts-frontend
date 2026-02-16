import { Button, Collapse, Flex, Form, Input, InputNumber, Space, Statistic, Table, theme, Typography } from "antd";
import { useState } from "react";
import type { Account, InputComponent, InputType } from "../utils/Types";
import { grey, red } from "@ant-design/colors";
import { PlusCircleFilled } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { dollarAmountFormatter } from "../utils/Utils";
import { useAccounts } from "../hooks/useData";


export function Accounts() {
    // const { accounts, addAccount } = useAccounts();
    const [accounts, addAccount, refetchAccounts, loading, error] = useAccounts();

    // TODO: Remove dummy data
    const data = accounts.length > 0 ? accounts : [
        { id: 1, name: "My Splitwise", initialAmount: 0, currentAmount: 2147.32 },
        { id: 2, name: "Credit Card 1", initialAmount: 0, currentAmount: -232.21 },
    ];
    return (
        <>
            <Flex vertical align="center" gap="large">
                {// TODO: Use api result
                }
                <Table<Account>
                    dataSource={data}
                    pagination={false}
                    rowKey={"id"}
                    expandable={{
                        fixed: "right",
                        expandRowByClick: true,
                        rowExpandable: () => true,
                        expandedRowRender: (record) => (<AmountComparizon account={record} />),
                    }}
                    styles={{
                        root: { maxWidth: "600px" },
                    }}
                >
                    <Table.Column title="Name" dataIndex="name" />
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
                <AccountInput onSubmit={addAccount} />
            </Flex>
        </>
    );
}

function AmountComparizon(props: { account: Account }) {
    const [actualAmount, setActualAmount] = useState<number | null>(null);
    const unaccountedValue: number = actualAmount ? actualAmount - props.account.currentAmount : 0;
    const color = unaccountedValue !== 0 ? red[6] : "white";

    return (
        <>
            <Typography.Title
                level={5}
                style={{
                    margin: "0 0 0.5em",
                }}
            >
                Investigate mismatch
            </Typography.Title>
            <Flex
                justify="flex-end"
                gap="middle"
            >
                <Statistic
                    title={"Unaccounted"}
                    value={unaccountedValue}
                    prefix={"$"}
                    precision={2}
                    styles={{
                        prefix: { color },
                        content: { color },
                        title: { justifySelf: "end" }
                    }}
                />
                <Space
                    orientation="vertical"
                    align="start"
                >
                    <Typography.Text style={{ padding: "0 4px" }}> Actual Amount </Typography.Text>
                    <InputNumber<number>
                        prefix="$"
                        style={{ minWidth: "120px" }}
                        styles={{ actions: { display: "none" } }}
                        precision={2}
                        formatter={(value) => {
                            if (value !== undefined) {
                                return dollarAmountFormatter(value);
                            }
                            return "";
                        }}
                        onChange={setActualAmount}
                    />
                </Space>
            </Flex>
        </>
    )
}

const AccountInput: InputComponent<Account> = ({ onSubmit }) => {
    const { token } = theme.useToken();
    const [form] = useForm();

    return (
        <>
            <Collapse
                expandIconPlacement="end"
                styles={{ root: { width: "100%", maxWidth: "350px" } }}
                expandIcon={(panelProps) => {
                    return (<PlusCircleFilled
                        style={{
                            color: panelProps.isActive ? grey[3] : token.colorPrimary,
                        }}
                    />)
                }}
                items={[
                    {
                        label: (<Typography.Text strong style={{ fontSize: "16px" }}>Add New</Typography.Text>),
                        children: (
                            <Form<InputType<Account>>
                                form={form}
                                name="AccountInput"
                                layout="vertical"
                                onFinish={(value) => {
                                    onSubmit({
                                        ...value,
                                        currentAmount: value.initialAmount,
                                    }).then(() => form.resetFields());
                                }}
                                styles={{
                                    root: { padding: "8px 8px 0px" }
                                }}
                            >
                                <Form.Item
                                    label="Account Name"
                                    name="name"
                                    rules={[
                                        { required: true, message: "" },
                                        {
                                            pattern: /^\w*$/,
                                            message: "Invalid name"
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Initial Amount"
                                    name="initialAmount"
                                    rules={[{ required: true, message: "" }]}
                                >
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
                                        htmlType="submit"
                                        onClick={() => form.submit()}
                                    >
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        ),
                    }
                ]}
            />
        </>
    );
}
