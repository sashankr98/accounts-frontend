import { Dropdown, Flex, Tabs, theme, Typography, type MenuProps, type TabsProps } from "antd";
import { View } from "../utils/Types";
import { Transactions } from "./Transactions";
import { Accounts } from "./Accounts";
import { Categories } from "./Categories";
import { Dashboard } from "./Dashboard";
import { useWindowSize, WindowSize } from "../hooks/useWindowSize";
import { useState } from "react";
import { DownCircleOutlined } from "@ant-design/icons";

const viewTabs: TabsProps["items"] = [
    {
        label: View.TRANSACTIONS,
        key: View.TRANSACTIONS,
        children: <Transactions />,
    },
    {
        label: View.ACCOUNTS,
        key: View.ACCOUNTS,
        children: <Accounts />,
    },
    {
        label: View.CATEGORIES,
        key: View.CATEGORIES,
        children: <Categories />,
    },
    {
        label: View.DASHBOARD,
        key: View.DASHBOARD,
        children: <Dashboard />,
    },
];

function ViewDropdown(props: {
    view: string;
    onSelect: (view: string) => void;
}) {
    const { token } = theme.useToken();

    const viewDropdownItems: MenuProps["items"] = viewTabs!
        .filter(tab => tab.key !== props.view)
        .map(({ label, key }) => {
            return {
                label,
                key,
            }
        });

    return (
        <Flex
            justify="space-between"
            align="center"
        >
            <Typography.Title level={3} style={{ color: token.colorPrimary }}>{props.view}</Typography.Title>
            <Dropdown
                arrow={true}
                menu={{
                    items: viewDropdownItems,
                    onClick: ({ key }) => props.onSelect(key)
                }}
            >
                <DownCircleOutlined style={{
                    fontSize: "24px",
                    marginTop: "1.2em",
                    marginBottom: "0.5em",
                    color: token.colorPrimary,
                }} />
            </Dropdown>
        </Flex>
    );
};

export function Navigator() {
    const windowSize = useWindowSize();
    // TODO: Tx should be default
    const [view, setView] = useState(View.ACCOUNTS);

    return (<>
        <Tabs
            activeKey={view}
            defaultActiveKey={View.TRANSACTIONS}
            items={viewTabs}
            onTabClick={key => setView(key)}
            renderTabBar={(props, DefaultTabBar) => {
                if (windowSize === WindowSize.MOBILE) {
                    return <ViewDropdown view={view} onSelect={setView} />
                }
                return <DefaultTabBar {...props} />;
            }}
            styles={{
                item: {
                    fontSize: "24px",
                    fontWeight: 600,
                }
            }}
        />

    </>);
}
