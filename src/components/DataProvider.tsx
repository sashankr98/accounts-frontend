import { createContext, useCallback, useEffect, useState, type ReactNode } from "react"
import { Endpoint, type Account, type Category, type InputType, type Transaction } from "../utils/Types";
import axios, { AxiosError, type AxiosResponse } from "axios";

const DataContext = createContext<{
    isLoading: boolean;
    error: string | null;

    accounts: Account[];
    addAccount: (newAccount: InputType<Account>) => Promise<void>;

    categories: Category[];
    addCategory: (newCategory: InputType<Category>) => Promise<void>;

    transactions: Transaction[];
    fetchTransactions: (filters: Record<string, string>) => Promise<void>
    addTransaction: (newTransaction: InputType<Transaction>) => Promise<void>;
} | null>(null);

// TODO: Expose context

export const DataProvider: React.FC<{
    children: ReactNode,
}> = ({ children }) => {
    const [error, setError] = useState<string | null>(null);

    const [accounts, fetchAccounts, addAccount, accountsLoading] = useApi<Account>(Endpoint.ACCOUNTS);
    const [categories, fetchCategories, addCategory, categoriesLoading] = useApi<Category>(Endpoint.CATEGORIES);
    const [transactions, fetchTransactions, addTransaction, transactionsLoading] = useApi<Transaction>(Endpoint.TRANSACTIONS);

    useEffect(() => {
        Promise.all([
            fetchAccounts(),
            fetchCategories(),
            fetchTransactions(),
        ]).catch(e => setError((e as Error).message));
    }, [fetchAccounts, fetchCategories, fetchTransactions]);

    const isLoading = accountsLoading || categoriesLoading || transactionsLoading;

    return (
        <DataContext.Provider value={{
            isLoading,
            error,

            accounts,
            addAccount,

            categories,
            addCategory,

            transactions,
            fetchTransactions,
            addTransaction,
        }}>
            {children}
        </DataContext.Provider>
    );
}

const useApi = <T,>(apiEndpoint: string): [
    T[],
    () => Promise<void>,
    (entry: InputType<T>) => Promise<void>,
    boolean,
] => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(async (params?: Record<string, string>) => {
        setLoading(true);
        try {
            const { data } = await axios.get<T[]>(apiEndpoint, { params });
            setData(data);
        } catch (error) {
            const e = error as AxiosError;
            console.debug(e.message);
            throw new Error(`Failed to get ${apiEndpoint} - ${e.message}`);
        } finally {
            setLoading(false);
        }
    }, [apiEndpoint, setData]);

    const addEntry = useCallback(async (newEntry: InputType<T>) => {
        setLoading(true);
        try {
            const { data: entry } = await axios.post<
                T,
                AxiosResponse<T, InputType<T>>,
                InputType<T>
            >(apiEndpoint, newEntry);

            setData(data => [entry, ...data]);
        } catch (error) {
            const e = error as AxiosError;
            console.debug(e.message);
            throw new Error(`Failed to post ${apiEndpoint} - ${e.message}`);
        } finally {
            setLoading(false);
        }
    }, [apiEndpoint, setData]);

    return [
        data,
        fetchData,
        addEntry,
        loading,
    ];
};
