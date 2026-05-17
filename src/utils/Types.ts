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

export type Account = {
    id: number;
    name: string;
    initialAmount: number;
    currentAmount?: number;
};
