import { ConfigProvider, Layout, theme, Typography } from "antd"
import { magenta } from "@ant-design/colors"
import { Navigator } from "./components/Navigator"

function App() {

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: magenta[4],
                    },
                    algorithm: theme.darkAlgorithm,
                }}
                table={{
                    style: {
                        marginTop: "1em",
                        marginBottom: "1em",
                    },
                }}
            >
                <Layout
                    style={{
                        padding: "12px 32px",
                        minHeight: "100vh"
                    }}
                    hasSider={false}
                >
                    <Typography.Title>Accounts Tracker</Typography.Title>
                    <Layout.Content>
                        <Navigator />
                    </Layout.Content>
                </Layout>
            </ConfigProvider>
        </>
    )
}

export default App
