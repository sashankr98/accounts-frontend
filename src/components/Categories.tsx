import { Button, Collapse, Flex, Form, Input, InputNumber, Statistic, Table, theme, Typography } from "antd";
import { useCategories } from "../hooks/useData";
import type { Category, InputComponent, InputType } from "../utils/Types";
import { useForm } from "antd/es/form/Form";
import { PlusCircleFilled } from "@ant-design/icons";
import { grey } from "@ant-design/colors";
import { dollarAmountFormatter } from "../utils/Utils";

export function Categories() {
    const [categories, addCategory, refetchCategories, loading, error] = useCategories();

    const data: Category[] = categories.length > 0 ? categories : [
        { id: 1, name: "Groceries" },
        { id: 2, name: "Restaurants", },
        { id: 3, name: "Paycheck", },
    ];

    return (
        <>
            {/* TODO: Should not wrap */}
            <Flex vertical align="center" gap="large">
                <Table<Category>
                    dataSource={data}
                    pagination={false}
                    rowKey={"id"}
                >
                    <Table.Column fixed="start" title="Name" dataIndex="name" />
                    {/* TODO: Include pivot table data here */}
                    {/* TODO: Make cell editable to update budget */}
                    <Table.Column
                        title="Budget"
                        dataIndex="budget"
                        fixed="end"
                        render={(value) =>
                            <Statistic
                                value={value}
                                precision={2}
                                prefix={"$"}
                            />
                        }
                    />
                </Table>
                <CategoryInput onSubmit={addCategory} />
            </Flex>
        </>
    )
}

const CategoryInput: InputComponent<Category> = ({ onSubmit }) => {
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
                            <Form<InputType<Category>>
                                form={form}
                                name="CategoryInput"
                                layout="vertical"
                                onFinish={(value) => {
                                    onSubmit({
                                        budget: 0,
                                        ...value,
                                    }).then(() => form.resetFields());
                                }}
                                styles={{
                                    root: { padding: "8px 8px 0px" }
                                }}
                            >
                                <Form.Item
                                    label="Category Name"
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
                                    label="Budget"
                                    name="budget"
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
