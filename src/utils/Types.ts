export type Account = {
    id: number;
    name: string;
    initialAmount: number;
    currentAmount: number;
};

type BaseTransaction = {
    id: number;
    date: number;
    description: string;
    category: string;
};

type ExpenseTransaction = BaseTransaction & {
    expenseAccount: string;
    expenseAmount: number;
    incomeAccount?: string;
    incomeAmount?: number;
};

type IncomeTransaction = BaseTransaction & {
    expenseAccount?: string;
    expenseAmount?: number;
    incomeAccount: string;
    incomeAmount: number;
};

export type Transaction = ExpenseTransaction | IncomeTransaction;

export type Category = {
    id: number;
    name: string;
    budget?: number;
};

export const View = {
    TRANSACTIONS: "Transactions",
    ACCOUNTS: "Accounts",
    CATEGORIES: "Categories",
    DASHBOARD: "Dashboard",
};

export const Endpoint: Record<keyof typeof View, string> = {
    TRANSACTIONS: "/transactions",
    ACCOUNTS: "/accounts",
    CATEGORIES: "/categories",
    DASHBOARD: "/dashboard",
}

export type InputType<T> = Omit<T, "id">;

export type InputComponent<T> = React.FC<{
    onSubmit: (input: InputType<T>) => Promise<T>;
}>
